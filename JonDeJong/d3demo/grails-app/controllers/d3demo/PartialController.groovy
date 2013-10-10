package d3demo

class PartialController {

    def index() {
        render view: "/${params.objectType}/${params.targetAction}"
    }
}
