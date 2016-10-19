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

    string WriteValues(Enum e){
        return string.Join(",\r\n\t", e.Values.Select(v=>v.Name));
    }

}
/***********************************
*
* WARNING:  This file is generated. 
* PLEASE do not attempt to edit it
*
***********************************/

$Enums(x => searchFilter.Any(s=> x.FullName.StartsWith(s)) && !x.FullName.EndsWith("Request") && !x.Name.StartsWith("Base") && !x.Name.Contains("Fake") && !x.Name.Contains("Schema") && !x.Name.EndsWith("Configuration"))[ 

export enum $Name {
    $WriteValues
}
]

