//@Copyright 2018 BŚ
class pytanie{
    constructor(id,nrP,pytanie,odpA,odpB,odpC,odpD,img,ans,imgW,imgH)
    {
        this.id = id;
        this.pytanie = pytanie;
        this.odpA = odpA;
        this.odpB = odpB;
        this.odpC = odpC;
        this.odpD = odpD;
        this.ans = ans;
        this.nrP = nrP;
        this.img = img;
        this.imgW = imgW;
        this.imgH =imgH;
    }
   
    
}
class cPytanie{
    constructor(pytanie,odpA,odpB,odpC,odpD,ans)
    {
        this.pytanie = pytanie;
        this.odpA = odpA;
        this.odpB = odpB;
        this.odpC = odpC;
        this.odpD = odpD;
        this.ans = ans;
    }
}
class BodyTest{
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
    }
}

