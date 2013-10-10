class BootStrap {

    def moduleService

    def init = { servletContext ->
        moduleService.randomize()
    }
    def destroy = {
    }
}
