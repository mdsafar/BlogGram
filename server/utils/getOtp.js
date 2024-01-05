  
  export const generateOtp = ()=>{
     let otp = ""
    for(let i =0; i < 4 ; i++){
        let rndVal = Math.floor(Math.random()*9)
        otp += rndVal
    }
    return otp
  }


  