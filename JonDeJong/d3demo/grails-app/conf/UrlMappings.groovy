class UrlMappings {

	static mappings = {

        "/partial/$objectType?/$targetAction?" (controller: 'partial', action: 'index') {
            constraints {
                // apply constraints here
            }
        }

		"/$controller/$action?/$id?"{
			constraints {
				// apply constraints here
			}
		}

		"/"(controller: "demo", action: "index")
		"500"(view:'/error')
	}
}
