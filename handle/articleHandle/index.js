/*
 * @Descripttion: 文章信息相关操作
 * @version:
 * @Author: Chenyx
 * @Date: 2022-10-21 23:58:55
 * @LastEditors: Chenyx
 * @LastEditTime: 2022-10-24 18:33:11
 */

var superagent = require("superagent");

exports.getArticleList = (req, res) => {
  let result = {};
  let param = {
    page: 1,
    size: 20,
    businessType: blog,
    orderby: "",
    noMore: false,
    year: "",
    month: "",
    username: Cd_Air,
  };
  const url = "https://blog.csdn.net/community/home-api/v1/get-business-list";
  const headers = {
    "cookie":`uuid_tt_dd=10_19749718040-1661166809423-189346; 
    __gads=ID=ef3dfaa70fd2acc1-22eecbbbc1d5000c:T=1661166816:RT=1661166816:S=ALNI_MY4UfcUey4Wy9sm4AOAH_hHB9VtoQ; 
    UserName=Cd_Air; UserInfo=d7ba6ff673654236993069a6e7873a3a; 
    UserToken=d7ba6ff673654236993069a6e7873a3a; 
    UserNick=Cd_Air; 
    AU=6E3; 
    UN=Cd_Air; 
    BT=1661174052695; 
    p_uid=U010000; 
    Hm_up_6bcd52f51e9b3dce32bec4a3997715ac={"islogin":{"value":"1","scope":1},"isonline":{"value":"1","scope":1},"isvip":{"value":"0","scope":1},"uid_":{"value":"Cd_Air","scope":1}}; 
    Hm_ct_6bcd52f51e9b3dce32bec4a3997715ac=6525*1*10_19749718040-1661166809423-189346!5744*1*Cd_Air; 
    __bid_n=183855e216d5e04eb94207; 
    FPTOKEN=30$f+eUqEqozcFOLuZbyX5X4JjNLEAa7w1gD3G4sJeXHvbOidub2XQgWg4JYhqEc5JKtquXIp96xvdrQfXV94dJG6O2Eruomf+QL7wZOJ2nuLxbL3QjHUjSgkdUrDuJaTl8ifxsC73i2GO7XM9juzu4rOU3AAG5Zb3cyPtMz3O50UewzefoSTlUPdEtqxRg6itKY4Zd3vN06rFh5voxw0KicVD7KGysrZ8Lr9QHBN32G5XsYh1qlFfAkF9J8uXUc6Rxja3ngfiBA463K7CXXDkpW0xPpJc89nDDhmupzb61liihPfenV7hcCVhB3b93Vif1kbtlbjaAqL2bOvJkuZ2PLczXvz1hxNlyt8Vokv/LOuNHfJ5YeJO4owC2v6O4eZMi|pjWCQdhe2JilsYoes2oNz00n4nKqlvxtR1EqlGS62lQ=|10|01e61e858173d4af21ff9c99aebd0229; 
    c_dl_prid=1665384215290_280053; 
    c_dl_rid=1665854020193_622344; 
    c_dl_fref=https://blog.csdn.net/weixin_45588654/article/details/122591440; 
    c_dl_fpage=/download/weixin_38500630/12923108; 
    c_dl_um=-; 
    firstDie=1; dc_sid=bfe247ce34f61f62cde6b24b6ace81c5; c_segment=2; Hm_lvt_6bcd52f51e9b3dce32bec4a3997715ac=1664389637,1665389756,1666266301,1666534650; is_advert=1; __gpi=UID=000008e1850ba2a9:T=1661166816:RT=1666586356:S=ALNI_MYdiMmnlbscJVTW_AASEKLU5_OOtg; FCNEC=[["AKsRol_Fb7rEBNXn_Gsfhid32FbiBxTcMTaJnUXyoNIiwvNRIfmcMGs7Y1jivvibrKWcqrEv29c_P58urKkjNjokxuHaFWuFl6NbZ4z19rIqmIYukMbT6Gv9WLtqoXIUYkvHMT40MYh-u2PYa6FiiodlK27i5780MQ=="],null,[]]; ssxmod_itna=Qq+xyQG=DQi=itDODBDl4iqEbbZ9nBhAoggOTCqGX23DZDiqAPGhDCfb/88E38obwPGWoC0IdHFAS2+pebUjnDaxacTqGIDeKG2DmeDyDi5GRD0FPdD4RKGwD0eG+DD4DWFqDUlvdqGPSnwXRAdd4DeGvRLj0+wUdD0P4DYPaCqGyUeGuSwt2S4RMejXoL7Gpt6+zAA+K7EGozioPUA4qQGepbSY4Bime8GDFcDdaxD34FiwY9iD; ssxmod_itna2=Qq+xyQG=DQi=itDODBDl4iqEbbZ9nBhAoggOTeA6WTD/KK+DFECbU2AhBEPAP4Outn8riOCY3LB0+d=BqAum41cMR2e5s9dkeGYMcYAnzNm=002o/e5g3Bxf2STBM6D6r712BYd3QhmF30sWSIZQe24cLpAtwmHQmGP82jPs36zSMo4IrT68Wj0IwDGj4WdyjPrxjpLUCfQt8e3MOKMloUyYlFi5=Lht==BA2yzoKy4Mk645W0g84n+j1UB/m2HPqEQ5/ok3qnbpg5vvCC25+DL5OUQuMEjx=/hjUXDZWMDgFSkFY6YRxxbRc4nneRFFy4RReb0FbuUlh=bFFjvNS+XD9CUIX+wuA9H7IwDwYXwhCTeRph9+=FKW3b/GR2Ym=tYWDbP5PYOurlcalANMEmBpm9RQYwYoeoh+iHfW+KTt5VC9TsRn/baoSulTWyfTu3aTxDKdxHBxdDpId4NYNHGxnAjv6rDr6jc6oDDLxD2FGDD=; dc_session_id=10_1666603249072.544082; c_pref=default; c_first_ref=default; c_first_page=https://blog.csdn.net/Cd_Air/article/details/120809090; c_dsid=11_1666603663339.627562; log_Id_click=329; c_ref=https://blog.csdn.net/Cd_Air/article/details/120809090; Hm_lpvt_6bcd52f51e9b3dce32bec4a3997715ac=1666603972; log_Id_view=1835; c_page_id=default; dc_tos=rk93v0; log_Id_pv=395`,
    "user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36"
  }
  superagent
    .get(url)
    .send(param)
    .set("headers",headers)
    // 设置些需要的头
    .set("Content-Type", "application/json;charset=UTF-8")
    .end(function (err, res1) {
        console.log(`output->res`,res1)
        console.log(`output->err`,err)
    //   if (res.code == 200) {
    //     result = res.data;
    //     console.log(`output->result`, result);
    //   } else {
    //     console.log(`output->err`, err);
    //   }
      //   res.send(result);
    });
};
