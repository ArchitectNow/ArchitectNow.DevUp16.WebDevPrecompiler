${
	using Typewriter.Extensions.Types;
    private static HashSet<string> searchFilter = new HashSet<string>();

	// Uncomment the constructor to change template settings.
	Template(Settings settings)
	{
		settings.IncludeCurrentProject();
		settings.IncludeReferencedProjects();
        settings.IncludeProject("ArchitectNow.DevUp16.WebDevPrecompiler.Data");
        searchFilter.Add("ArchitectNow.DevUp16.WebDevPrecompiler.API.V1.Models");
        searchFilter.Add("ArchitectNow.DevUp16.WebDevPrecompiler.Data.Models");
	}

    string GetType(Property p)
	{		
        return p.Type.Name;
	}

    string RequiredAttr(Property p)
	{
		if (p.Attributes.Any(x => x.Name=="Required"))
		{
			return "//[Required]";
		}

        return "";
	}

	string Imports(Class m) 
	{        
		var props = m.Properties.Where(x => !x.Type.IsPrimitive);
		var used = new HashSet<string>();

		foreach (var prop in props)
		{
			var type = prop.Type.Name;

			type = type.Replace("[]",""); //ignore arrays

			if (type != "any" && !m.TypeArguments.Any(x=>x.Name == type))
			{
				used.Add(type);
			}
		}
        
        var imports = string.Join(System.Environment.NewLine, used.OrderBy(x=>x).Select(type=> $"import {{ { type } }} from \"./{ type }\""));

        return imports;
	}

    string EnumImports(Class m) 
	{        
		var props = m.Properties.Where(x => x.Type.IsEnum);
		var used = new HashSet<string>();

		foreach (var prop in props)
		{
			var type = prop.Type.Name;

			type = type.Replace("[]",""); //ignore arrays

			if (type != "any" && !m.TypeArguments.Any(x=>x.Name == type))
			{
				used.Add(type);
			}
		}

        var imports = string.Join(System.Environment.NewLine, used.OrderBy(x=>x).Select(type=> $"import {{ { type } }} from \"./{ type }\""));
		
        return imports;
	}
}
/***********************************
*
* WARNING:  This file is generated. 
* PLEASE do not attempt to edit it
*
***********************************/
$Classes(x => searchFilter.Any(s=> x.FullName.StartsWith(s))  && !x.FullName.EndsWith("Request") && !x.Name.StartsWith("Base") && !x.Name.Contains("Fake") && !x.Name.Contains("Schema") && !x.Name.EndsWith("Configuration"))[ 
import { BaseModel } from "./_BaseModel";
$Imports
$EnumImports

export class $Name$TypeArguments extends BaseModel {

	constructor(kwArgs?) {
		super(kwArgs);
	}

	$Properties[
	$RequiredAttr
	public $name: $GetType;
	]

}
]

