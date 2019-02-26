let bodypytania = require("./pytanieClass");
module.exports = class BodyTest{
    constructor(id,test_id,klasa_id,ilosc_pytan,savW,goscT,synch,time,status)
    {
        this.id = id;
        this.test_id =test_id;
        this.klasa_id = klasa_id;
        this.ilosc_pytan = ilosc_pytan;
        this.savW = savW;
        this.goscT = goscT;
        this.synch = synch;
        this.time = time;
        this.status = status;
        this.pytania = [];
        this.load = 0;
        this.mysql_ID;
    }
}