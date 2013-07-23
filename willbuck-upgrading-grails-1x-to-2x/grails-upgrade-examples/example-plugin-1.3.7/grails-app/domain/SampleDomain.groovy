class SampleDomain {
    // A legitimate use case
    /**
    String telephoneNumber
    String telephoneNumber_areaCode
    String telephoneNumber_prefix
    String telephoneNumber_lineNumber
    **/

    int id

    // Accidental oopsies, but won't kill things
    String name
    String name_sourceId

    // NOW we're talking trouble
    Date dateOfBirth
    String dateOfBirth_sourceId
}