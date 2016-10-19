${
    using Typewriter.Extensions.WebApi;
    using Typewriter.Extensions.Types;
    private static HashSet<string> searchFilter = new HashSet<string>();

    Template(Settings settings)
    {
		settings.OutputExtension = ".ts";
        searchFilter.Add("ArchitectNow.DevUp16.WebDevPrecompiler.API.V1");

        settings.OutputFilenameFactory = file => 
        {
            return $"{file.Name.Replace("Controller","").Replace(".cs","")}.Api.Service.ts";
        };
    }

	bool IsHttpPost(Method m)
	{
		return m.HttpMethod() == "post";
	}

	bool IsHttpGet(Method m)
	{
		return m.HttpMethod() == "get";
	}

	bool IsHttpPut(Method m)
	{
		return m.HttpMethod() == "put";
	}

	bool IsHttpDelete(Method m)
	{
		return m.HttpMethod() == "delete";
	}

    bool IsExcludedResultTypes(Type type){
        var excludedResultTypes = new List<string> {"IActionResult", "void"};

        return excludedResultTypes.Contains(type.Name);
    }

    string ReturnType(Method m) => IsExcludedResultTypes(m.Type) ? "Observable<{}>" : $"Observable<{m.Type.Name}>";
	string ReturnCast(Method m) => IsExcludedResultTypes(m.Type) ? "x" : $"<{m.Type.Name}>x";
    string ServiceName(Class c) => c.Name.Replace("Controller", "ApiService");
	string ControllerName(Class c) => c.Name.Replace("Controller", "");
    string TypeMap(Method method)
    {
    
        var type = method.Type;

        if(IsExcludedResultTypes(method.Type)){
            return "data";
        }

        if (type.IsPrimitive)
        {
            return type.IsDate ?
                $"new Date(data.{method.Name})" :
                $"data.{method.Name}";
        }
        else
        {
            return type.IsEnumerable ?
                $"data.map(i => new {type.Name.TrimEnd('[', ']')}(i))" :
                $"new {type.Name}(data)";
        }
    }

    string AdjustedQueryParameters(Method m)
    {
        var parameters =m.Parameters.Select(p => new KeyValuePair<string, string>(p.name, p.Type)).ToDictionary(x=>x.Key, x=>x.Value);
        var hasPaging = m.Attributes.Any(x => x.Name == "Pagable");
        var hasSorting = m.Attributes.Any(x => x.Name == "Sortable");

        if(hasPaging || hasSorting){
            parameters.Add("descending", "descending");
            parameters.Add("sortName", "sortName");
        }
        if(hasPaging){
            parameters.Add("limit", "limit");
            parameters.Add("offset", "offset");
        }

        if (parameters.Count==0)
		{
			return "var paramsToSend = \"\";";
		}
        
        var builder = new System.Text.StringBuilder();

        builder
        .Append("var parameters = [];")
        .AppendLine();

        foreach(var p in parameters){
            builder
            .Append($"if({p.Key}){{")
            .AppendLine()
            .Append($"parameters.push({{name: '{p.Key}', value: {p.Key}}});")
            .AppendLine()
            .Append("}")
            .AppendLine();
        }

        builder.Append("var paramsToSend = parameters.map(p => p.name + '=' + p.value).join('&');");

		return builder.ToString();
    }

    string AdjustedPostParameters(Method m)
    {
        var expandParameters = m.Attributes.Any(x => x.Name == "ExpandParameters");
		if (!expandParameters)
		{   
            var fromBodyParameter = m.Parameters.FirstOrDefault(p=>p.Attributes.Any(attr=> attr.Name == "FromBody"));
            if(fromBodyParameter != null){
                return $"{fromBodyParameter.name}";
            }

			var parameters = m.Parameters.Select(p => new KeyValuePair<string, string>(p.name, p.Type)).ToList();

			return "{" + string.Join(", ", parameters.Select(p => string.Format("'{0}': {1}", p.Key, p.Key))) + "}";
		}

		var _result = "";
		foreach	(var _param in m.Parameters)
		{
            var paramFormat = "'{0}': {1}";

			var _local = string.Join(",",_param.Type.Properties.Select(x => string.Format(paramFormat,x.name,x.name)));

			if (!string.IsNullOrEmpty(_result))
			{
				_result += ", ";
			}

			_result += _local;

		}

		return $"{{ {_result } }}";
    }

    string ExpandParameters(Method m)
    {
        var _result = "";
		foreach	(var _param in m.Parameters)
		{
			var _local = string.Join(", ",_param.Type.Properties.Select(x => string.Format("{0}: {1}",x.name,x.Type.name)));

			if (!string.IsNullOrEmpty(_result))
			{
				_result += ", ";
			}

			_result += _local;

		}

		return _result;
    }

    
	string GetMethodParameters(Method m)
	{        
		if (m.Attributes.Any(x => x.Name == "ExpandParameters"))
		{
			return ExpandParameters(m);
		}
		else
		{
            var result = string.Join(", ", m.Parameters.Select(x => string.Format("{0}: {1}",x.name,x.Type.Name)));
            
            if (m.Attributes.Any(x => x.Name == "Pagable"))
            {
                if (result.Length > 0)
                {
                    result += ", ";
                }
                result += "sortName = null, limit = 100, offset = 0, descending = false";
            }
            return result;
		}

	}

	string Imports(Class m)  {

		var classes = new HashSet<string>();

		foreach	(var method in m.Methods)
		{
			GetClassImports(classes,method.Type);

			foreach (var _param in method.Parameters)
			{
				GetClassImports(classes,_param.Type);
			}
		}
        
		var imports = string.Join(System.Environment.NewLine, classes.OrderBy(x=>x).Select(type=> $"import {{ { type } }} from \"../models/{ type }\""));

        return imports;
	}

    string EnumImports(Class m)  {

		var enums = new HashSet<string>();

		foreach	(var method in m.Methods)
		{
			GetEnumImports(enums, method.Type);

			foreach (var _param in method.Parameters)
			{
				GetEnumImports(enums,_param.Type);
			}
		}

        var imports = string.Join(System.Environment.NewLine, enums.OrderBy(x=>x).Select(type=> $"import {{ { type } }} from \"../enums/{ type }\""));
		
        return imports;        
	}
    
	void GetClassImports(HashSet<string> used, Type newType)
	{        
		if (newType.IsPrimitive || IsExcludedResultTypes(newType))
		{
			return;
		}        
        
        GetImports(used, newType);
	}

    void GetEnumImports(HashSet<string> used, Type newType)
	{        
		if (!newType.IsEnum)
		{
			return;
		}
        
        GetImports(used, newType);
	}

    void GetImports(HashSet<string> used, Type newType)
	{   
        var className = newType.Name.Replace("[]","");
          
        
		if (newType.TypeParameters.Count>0)
		{
            var genericTypeName = className;
			foreach (var genericType in newType.TypeArguments)
			{
                genericTypeName = genericTypeName.Replace(genericType, string.Empty);
				GetImports(used, genericType);
			}

            if (!string.IsNullOrEmpty(genericTypeName))
            {
                genericTypeName = genericTypeName.Replace(",", string.Empty).Replace("<>", string.Empty);
                used.Add(genericTypeName);
            }
		}
        else{
            if (!string.IsNullOrEmpty(className))
            {
			    used.Add(className);  
            }          
        }
	}

}

/***********************************
*
* WARNING:  This file is generated. 
* PLEASE do not attempt to edit it
*
***********************************/

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BaseApiService } from "./Base.Api.Service";
import { Observable } from "rxjs/Observable";
import { Store } from "../store/Store";

$Classes(x =>searchFilter.Any(s=> x.FullName.StartsWith(s))  && x.Name.EndsWith("Controller"))[
$Imports
$EnumImports]
$Classes(x => searchFilter.Any(s=> x.FullName.StartsWith(s))  && x.Name.EndsWith("Controller"))[@Injectable()
export class $ServiceName extends BaseApiService {

    constructor (protected http: Http , protected store: Store) {
        super(http, store);
		this.controllerName = '$ControllerName';
    }

$Methods[
        
    $name($GetMethodParameters) : $ReturnType	{
		$IsHttpGet[
        $AdjustedQueryParameters
        return this.makeRequest(this.buildUrl('$name'), paramsToSend, 'get')
				.map(data => $TypeMap) as $ReturnType;
		]
		$IsHttpPost[
        return this.makeRequest(this.buildUrl('$name'), $AdjustedPostParameters,'post')
				.map(data => $TypeMap) as $ReturnType;
		]
		$IsHttpPut[
        return this.makeRequest(this.buildUrl('$name'), $AdjustedPostParameters,'put')
				.map(data => $TypeMap) as $ReturnType;
		]
		$IsHttpDelete[
        $AdjustedQueryParameters
        return this.makeRequest(this.buildUrl('$name'), paramsToSend,'delete')
				.map(data => $TypeMap) as $ReturnType;
		]
    };]
}]