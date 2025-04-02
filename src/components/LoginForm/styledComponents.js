import styled from 'styled-components'

export const LoginFormContainer=styled.div`
    width:100%;
    height:100vh;
    margin:0px;
    padding:0px;
    position:relative;
    // background-color:black;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    overflow:hidden;
`;

export const LoginBg1=styled.img`
    // width:125px;
    height:207px;
    position:absolute;
    top:-23px;
    left:-10px;
    width: 33%;

    @media screen and (min-width:768px){
        height: 300px;
    }
`;

export const LoginBg2=styled.img`
    // width:125px;
    height:207px;
    position:absolute;
    top:-142px;
    // left:124px;
    width: 33%;
    margin: auto;

    @media screen and (min-width:768px){
        height: 300px;
    }
`;

export const LoginBg3=styled.img`
    // width:125px;
    height:207px;
    position:absolute;
    top:-23px;
    // left:256px;
    width: 33%;
    right: -6px;

    @media screen and (min-width:768px){
        height: 300px;
    }
`;

export const LoginBg4=styled.img`
    // width:125px;
    height:207px;
    position:absolute;
    top:192px;
    left:-9px;
    width: 33%;

    @media screen and (min-width:768px){
        height: 300px;
        top:290px;
    }
`;

export const LoginBg5=styled.img`
    // width:125px;
    height:207px;
    position:absolute;
    top:73px;
    // left:123px;
    width: 33%;
    margin: auto;

    @media screen and (min-width:768px){
        height: 300px;
        top:175px;
    }
`;

export const LoginBg6=styled.img`
    // width:125px;
    height:207px;
    position:absolute;
    top:192px;
    // left:257px;
    width: 33%;
    right: -6px;

    @media screen and (min-width:768px){
        height: 300px;
        top:290px;
    }
`;

export const LoginBg7=styled.img`
    // width:125px;
    height:207px;
    position:absolute;
    top:407px;
    left:-9px;
    width: 33%;

    @media screen and (min-width:768px){
        height: 300px;
        top:605px;
    }
`;

export const LoginBg8=styled.img`
    // width:125px;
    height:207px;
    position:absolute;
    top:288px;
    // left:123px;
    width: 33%;
    margin: auto;

    @media screen and (min-width:768px){
        height: 300px;
        top:490px;
    }
`;

export const LoginBg9=styled.img`
    // width:125px;
    height:207px;
    position:absolute;
    top:407px;
    // left:257px;
    width: 33%;
    right: -6px;

    @media screen and (min-width:768px){
        height: 300px;
        top:605px;
    }
`;


export const FormAuthContainer=styled.div`
    background-color:white;
    border-top-left-radius:63px;
    border-top-right-radius:63px;
    z-index:1;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    position:absolute;
    left:0px;
    right:0px;
    bottom:-14px;
    // top:504px;
    // border: 2px solid red;
    height:45vh;
    width: 100%;
    box-sizing: border-box;
`;

export const FormHeadingContainer=styled.div`
    width:286px;
    height:62px;
    // background-color:yellow;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    box-sizing:border-box;
    margin-bottom:30px;
`;


// SignInButton,GoogleImg,GoogleBtnTxt
export const SignInButton=styled.button`
    background-color:#292929;
    border-radius:26px;
    padding: 14px 19px 14px 19px;
    width: 232.59px;
    height: 50px;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    border:none;
`;

export const ButtonCont=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:flex-end;
`;

export const GoogleImg=styled.img`
    width:22.59px;
    height: 25px;
    background-color:transparent;
`;

export const GoogleBtnTxt=styled.pre`
    height:22px;
    width:163px;
    color:white;
    font-family:Karla;
`;




export const AuthHeadingContainer=styled.div`
    position:relative;
    width:386px;
    height:62px;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
`;

export const AuthHeading=styled.h1`
    font-family:Karla;
    font-weight:600;
    font-size:28px;
    line-height:32.73px;
    color: black;

    @media screen and (min-width:768px) and (max-width:1024px){
        font-size:40px;
    }
`;

export const AuthLogoImg=styled.img`
    width:80px;
    height:75px;
`;

export const AuthParaDesp=styled.pre`
    font-family:Kumbh Sans;
    font-weight:400;
    font-size:16px;
    line-height:19.84px;
    color:black;
    margin:0px;
`;

