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

