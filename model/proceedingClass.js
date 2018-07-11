module.exports = class proceeding {

    constructor(cod, name, URL_Resumo, URL_ArtigoCompleto) {
        this.proceedingCode                 = cod;
        this.proceedingName                 = name;
        this.proceedingTeachersInvolved     = [];
        this.proceedingStudentsInvolved     = [];
        this.URL_Resumo                     = URL_Resumo;
        this.URL_ArtigoCompleto             = URL_ArtigoCompleto;
    }
    getProceedingInfoByTeacher() {
        
    }
};