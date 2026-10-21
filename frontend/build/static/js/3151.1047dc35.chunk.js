"use strict";(globalThis.webpackChunkfreelancer_dapp_frontend||=[]).push([[3151],{81508(t,e,i){i.d(e,{u:()=>d});var n=i(49477),o=i(80883),s=i(16496),r=i(65618),a=i(17321),l=i(60205),c=i(99632);class u{constructor(t){this.getNonce=t.getNonce}async createMessage(t){const e={accountAddress:t.accountAddress,chainId:t.chainId,version:"1",domain:"undefined"===typeof document?"Unknown Domain":document.location.host,uri:"undefined"===typeof document?"Unknown URI":document.location.href,resources:this.resources,nonce:await this.getNonce(t),issuedAt:this.stringifyDate(new Date),statement:void 0,expirationTime:void 0,notBefore:void 0},i={toString:()=>this.stringify(e)};return Object.assign(e,i)}stringify(t){const e=this.getNetworkName(t.chainId);return[`${t.domain} wants you to sign in with your ${e} account:`,t.accountAddress,t.statement?`\n${t.statement}\n`:"",`URI: ${t.uri}`,`Version: ${t.version}`,`Chain ID: ${t.chainId}`,`Nonce: ${t.nonce}`,t.issuedAt&&`Issued At: ${t.issuedAt}`,t.expirationTime&&`Expiration Time: ${t.expirationTime}`,t.notBefore&&`Not Before: ${t.notBefore}`,t.requestId&&`Request ID: ${t.requestId}`,t.resources?.length&&t.resources.reduce((t,e)=>`${t}\n- ${e}`,"Resources:")].filter(t=>"string"===typeof t).join("\n").trim()}getNetworkName(t){const e=a.W.getAllRequestedCaipNetworks();return c.L.getNetworkNameByCaipNetworkId(e,t)}stringifyDate(t){return t.toISOString()}}class d{constructor(t={}){this.otpUuid=null,this.listeners={sessionChanged:[]},this.localAuthStorageKey=t.localAuthStorageKey||n.Ws.SIWX_AUTH_TOKEN,this.localNonceStorageKey=t.localNonceStorageKey||n.Ws.SIWX_NONCE_TOKEN,this.required=t.required??!0,this.messenger=new u({getNonce:this.getNonce.bind(this)})}async createMessage(t){return this.messenger.createMessage(t)}async addSession(t){const e=await this.request({method:"POST",key:"authenticate",body:{data:t.data,message:t.message,signature:t.signature,clientId:this.getClientId(),walletInfo:this.getWalletInfo()},headers:["nonce","otp"]});this.setStorageToken(e.token,this.localAuthStorageKey),this.emit("sessionChanged",t),this.setAppKitAccountUser(function(t){const e=t.split(".");if(3!==e.length)throw new Error("Invalid token");const i=e[1];if("string"!==typeof i)throw new Error("Invalid token");const n=i.replace(/-/gu,"+").replace(/_/gu,"/"),o=n.padEnd(n.length+(4-n.length%4)%4,"=");return JSON.parse(atob(o))}(e.token)),this.otpUuid=null}async getSessions(t,e){try{if(!this.getStorageToken(this.localAuthStorageKey))return[];const i=await this.request({method:"GET",key:"me",query:{},headers:["auth"]});if(!i)return[];const n=i.address.toLowerCase()===e.toLowerCase(),o=i.caip2Network===t;if(!n||!o)return[];const s={data:{accountAddress:i.address,chainId:i.caip2Network},message:"",signature:""};return this.emit("sessionChanged",s),this.setAppKitAccountUser(i),[s]}catch{return[]}}async revokeSession(t,e){return Promise.resolve(this.clearStorageTokens())}async setSessions(t){if(0===t.length)this.clearStorageTokens();else{const e=t.find(t=>t.data.chainId===(0,l.kg)()?.caipNetworkId)||t[0];await this.addSession(e)}}getRequired(){return this.required}async getSessionAccount(){if(!this.getStorageToken(this.localAuthStorageKey))throw new Error("Not authenticated");return this.request({method:"GET",key:"me",body:void 0,query:{includeAppKitAccount:!0},headers:["auth"]})}async setSessionAccountMetadata(t=null){if(!this.getStorageToken(this.localAuthStorageKey))throw new Error("Not authenticated");return this.request({method:"PUT",key:"account-metadata",body:{metadata:t},headers:["auth"]})}on(t,e){return this.listeners[t].push(e),()=>{this.listeners[t]=this.listeners[t].filter(t=>t!==e)}}removeAllListeners(){Object.keys(this.listeners).forEach(t=>{this.listeners[t]=[]})}async requestEmailOtp({email:t,account:e}){const i=await this.request({method:"POST",key:"otp",body:{email:t,account:e}});return this.otpUuid=i.uuid,this.messenger.resources=[`email:${t}`],i}confirmEmailOtp({code:t}){return this.request({method:"PUT",key:"otp",body:{code:t},headers:["otp"]})}async request({method:t,key:e,query:i,body:n,headers:s}){const{projectId:r,st:a,sv:l}=this.getSDKProperties(),c=new URL(`${o.o.W3M_API_URL}/auth/v1/${String(e)}`);c.searchParams.set("projectId",r),c.searchParams.set("st",a),c.searchParams.set("sv",l),i&&Object.entries(i).forEach(([t,e])=>c.searchParams.set(t,String(e)));const u=await fetch(c,{method:t,body:n?JSON.stringify(n):void 0,headers:Array.isArray(s)?s.reduce((t,e)=>{switch(e){case"nonce":t["x-nonce-jwt"]=`Bearer ${this.getStorageToken(this.localNonceStorageKey)}`;break;case"auth":t.Authorization=`Bearer ${this.getStorageToken(this.localAuthStorageKey)}`;break;case"otp":this.otpUuid&&(t["x-otp"]=this.otpUuid)}return t},{}):void 0});if(!u.ok)throw new Error(await u.text());return u.headers.get("content-type")?.includes("application/json")?u.json():null}getStorageToken(t){return n.Ud.getItem(t)}setStorageToken(t,e){n.Ud.setItem(e,t)}clearStorageTokens(){this.otpUuid=null,n.Ud.removeItem(this.localAuthStorageKey),n.Ud.removeItem(this.localNonceStorageKey),this.emit("sessionChanged",void 0)}async getNonce(){const{nonce:t,token:e}=await this.request({method:"GET",key:"nonce"});return this.setStorageToken(e,this.localNonceStorageKey),t}getClientId(){return r.T.state.clientId}getWalletInfo(){const t=a.W.getAccountData()?.connectedWalletInfo;if(!t)return;if("social"in t&&"identifier"in t){return{type:"social",social:t.social,identifier:t.identifier}}const{name:e,icon:i}=t;let n="unknown";switch(t.type){case"EXTERNAL":case"INJECTED":case"ANNOUNCED":n="extension";break;case"WALLET_CONNECT":n="walletconnect";break;default:n="unknown"}return{type:n,name:e,icon:i}}getSDKProperties(){return s.N._getSdkProperties()}emit(t,e){this.listeners[t].forEach(t=>t(e))}setAppKitAccountUser(t){const{email:e}=t;e&&Object.values(o.o.CHAIN).forEach(t=>{a.W.setAccountProp("user",{email:e},t)})}}},93151(t,e,i){i.r(e),i.d(e,{W3mDataCaptureOtpConfirmView:()=>x,W3mDataCaptureView:()=>E,W3mEmailSuffixesWidget:()=>c,W3mRecentEmailsWidget:()=>h});var n=i(37022),o=i(56370),s=i(89268);const r=n.AH`
  .email-sufixes {
    display: flex;
    flex-direction: row;
    gap: var(--wui-spacing-3xs);
    overflow-x: auto;
    max-width: 100%;
    margin-top: var(--wui-spacing-s);
    margin-bottom: calc(-1 * var(--wui-spacing-m));
    padding-bottom: var(--wui-spacing-m);
    margin-left: calc(-1 * var(--wui-spacing-m));
    margin-right: calc(-1 * var(--wui-spacing-m));
    padding-left: var(--wui-spacing-m);
    padding-right: var(--wui-spacing-m);

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;var a=function(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};const l=["@gmail.com","@outlook.com","@yahoo.com","@hotmail.com","@aol.com","@icloud.com","@zoho.com"];let c=class extends n.WF{constructor(){super(...arguments),this.email=""}render(){const t=l.filter(this.filter.bind(this)).map(this.item.bind(this));return 0===t.length?null:n.qy`<div class="email-sufixes">${t}</div>`}filter(t){if(!this.email)return!1;const e=this.email.split("@");if(e.length<2)return!0;const i=e.pop();return t.includes(i)&&t!==`@${i}`}item(t){return n.qy`<wui-button variant="neutral" size="sm" @click=${()=>{const e=this.email.split("@");e.length>1&&e.pop();const i=e[0]+t;this.dispatchEvent(new CustomEvent("change",{detail:i,bubbles:!0,composed:!0}))}}
      >${t}</wui-button
    >`}};c.styles=[r],a([(0,o.MZ)()],c.prototype,"email",void 0),c=a([(0,s.EM)("w3m-email-suffixes-widget")],c);const u=n.AH`
  .recent-emails {
    display: flex;
    flex-direction: column;
    padding: var(--wui-spacing-s) 0;
    border-top: 1px solid var(--wui-color-gray-glass-005);
    border-bottom: 1px solid var(--wui-color-gray-glass-005);
  }

  .recent-emails-heading {
    margin-bottom: var(--wui-spacing-s);
  }

  .recent-emails-list-item {
    --wui-color-gray-glass-002: transparent;
  }
`;var d=function(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};let h=class extends n.WF{constructor(){super(...arguments),this.emails=[]}render(){return 0===this.emails.length?null:n.qy`<div class="recent-emails">
      <wui-text variant="micro-600" color="fg-200" class="recent-emails-heading"
        >Recently used emails</wui-text
      >
      ${this.emails.map(this.item.bind(this))}
    </div>`}item(t){return n.qy`<wui-list-item
      @click=${()=>{this.dispatchEvent(new CustomEvent("select",{detail:t,bubbles:!0,composed:!0}))}}
      ?chevron=${!0}
      icon="mail"
      iconVariant="overlay"
      class="recent-emails-list-item"
    >
      <wui-text variant="paragraph-500" color="fg-100">${t}</wui-text>
    </wui-list-item>`}};h.styles=[u],d([(0,o.MZ)()],h.prototype,"emails",void 0),h=d([(0,s.EM)("w3m-recent-emails-widget")],h);var p=i(71786),m=i(61139),g=i(17321),w=i(7258),f=i(81508),y=i(41722),v=function(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};let x=class extends y.H{constructor(){super(...arguments),this.siwx=p.H.state.siwx,this.onOtpSubmit=async t=>{await this.siwx.confirmEmailOtp({code:t}),m.I.replace("SIWXSignMessage")},this.onOtpResend=async t=>{const e=g.W.getAccountData();if(!e?.caipAddress)throw new Error("No account data found");await this.siwx.requestEmailOtp({email:t,account:e.caipAddress})}}connectedCallback(){this.siwx&&this.siwx instanceof f.u||w.P.showError("ReownAuthentication is not initialized."),super.connectedCallback()}shouldSubmitOnOtpChange(){return this.otp.length===y.H.OTP_LENGTH}};v([(0,o.wk)()],x.prototype,"siwx",void 0),x=v([(0,s.EM)("w3m-data-capture-otp-confirm-view")],x);var b=i(49477);const k=n.AH`
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);

    transition-property: margin, height;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);
    margin-top: -100px;

    &[data-state='loading'] {
      margin-top: 0px;
    }

    position: relative;
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 252px;
      width: 360px;
      background: radial-gradient(
        96.11% 53.95% at 50% 51.28%,
        transparent 0%,
        color-mix(in srgb, var(--wui-color-bg-100) 5%, transparent) 49%,
        color-mix(in srgb, var(--wui-color-bg-100) 65%, transparent) 99.43%
      );
    }
  }

  .hero-main-icon {
    width: 176px;
    transition-property: background-color;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-1);

    &[data-state='loading'] {
      width: 56px;
    }
  }

  .hero-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--wui-spacing-3xs);
    flex-wrap: nowrap;
    min-width: fit-content;

    &:nth-child(1) {
      transform: translateX(-30px);
    }

    &:nth-child(2) {
      transform: translateX(30px);
    }

    &:nth-child(4) {
      transform: translateX(40px);
    }

    transition-property: height;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);
    height: 68px;

    &[data-state='loading'] {
      height: 0px;
    }
  }

  .hero-row-icon {
    opacity: 0.1;
    transition-property: opacity;
    transition-duration: var(--wui-duration-md);
    transition-timing-function: var(--wui-ease-out-power-1);

    &[data-state='loading'] {
      opacity: 0;
    }
  }
`;var $=function(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};let E=class extends n.WF{constructor(){super(...arguments),this.email=m.I.state.data?.email??g.W.getAccountData()?.user?.email??"",this.address=g.W.getAccountData()?.address??"",this.loading=!1,this.appName=p.H.state.metadata?.name??"AppKit",this.siwx=p.H.state.siwx,this.isRequired=Array.isArray(p.H.state.remoteFeatures?.emailCapture)&&p.H.state.remoteFeatures?.emailCapture.includes("required"),this.recentEmails=this.getRecentEmails()}connectedCallback(){this.siwx&&this.siwx instanceof f.u||w.P.showError("ReownAuthentication is not initialized. Please contact support."),super.connectedCallback()}firstUpdated(){this.loading=!1,this.recentEmails=this.getRecentEmails(),this.email&&this.onSubmit()}render(){return n.qy`
      <wui-flex flexDirection="column" .padding=${["3xs","m","m","m"]} gap="l">
        ${this.hero()} ${this.paragraph()} ${this.emailInput()} ${this.recentEmailsWidget()}
        ${this.footerActions()}
      </wui-flex>
    `}hero(){return n.qy`
      <div class="hero" data-state=${this.loading?"loading":"default"}>
        ${this.heroRow(["id","mail","wallet","x","solana","qrCode"])}
        ${this.heroRow(["mail","farcaster","wallet","discord","mobile","qrCode"])}
        <div class="hero-row">
          ${this.heroIcon("github")} ${this.heroIcon("bank")}
          <wui-icon-box
            size="xl"
            iconSize="xxl"
            iconColor=${this.loading?"fg-100":"accent-100"}
            backgroundColor=${this.loading?"fg-100":"accent-100"}
            icon=${this.loading?"id":"user"}
            isOpaque
            class="hero-main-icon"
            data-state=${this.loading?"loading":"default"}
          >
          </wui-icon-box>
          ${this.heroIcon("id")} ${this.heroIcon("card")}
        </div>
        ${this.heroRow(["google","id","github","verify","apple","mobile"])}
      </div>
    `}heroRow(t){return n.qy`
      <div class="hero-row" data-state=${this.loading?"loading":"default"}>
        ${t.map(this.heroIcon.bind(this))}
      </div>
    `}heroIcon(t){return n.qy`
      <wui-icon-box
        size="xl"
        iconSize="xxl"
        iconColor="fg-100"
        backgroundColor="fg-100"
        icon=${t}
        data-state=${this.loading?"loading":"default"}
        isOpaque
        class="hero-row-icon"
      >
      </wui-icon-box>
    `}paragraph(){return this.loading?n.qy`
        <wui-text variant="paragraph-400" color="fg-200" align="center"
          >We are verifying your account with email
          <wui-text variant="paragraph-600" color="accent-100">${this.email}</wui-text> and address
          <wui-text variant="paragraph-600" color="fg-100">
            ${s.Zv.getTruncateString({string:this.address,charsEnd:4,charsStart:4,truncate:"middle"})} </wui-text
          >, please wait a moment.</wui-text
        >
      `:this.isRequired?n.qy`
        <wui-text variant="paragraph-600" color="fg-100" align="center">
          ${this.appName} requires your email for authentication.
        </wui-text>
      `:n.qy`
      <wui-flex flexDirection="column" gap="xs" alignItems="center">
        <wui-text variant="paragraph-600" color="fg-100" align="center" size>
          ${this.appName} would like to collect your email.
        </wui-text>

        <wui-text variant="small-400" color="fg-200" align="center">
          Don't worry, it's optional&mdash;you can skip this step.
        </wui-text>
      </wui-flex>
    `}emailInput(){if(this.loading)return null;const t=t=>{this.email=t.detail};return n.qy`
      <wui-flex flexDirection="column">
        <wui-email-input
          .value=${this.email}
          .disabled=${this.loading}
          @inputChange=${t}
          @keydown=${t=>{"Enter"===t.key&&this.onSubmit()}}
        ></wui-email-input>

        <w3m-email-suffixes-widget
          .email=${this.email}
          @change=${t}
        ></w3m-email-suffixes-widget>
      </wui-flex>
    `}recentEmailsWidget(){if(0===this.recentEmails.length||this.loading)return null;return n.qy`
      <w3m-recent-emails-widget
        .emails=${this.recentEmails}
        @select=${t=>{this.email=t.detail,this.onSubmit()}}
      ></w3m-recent-emails-widget>
    `}footerActions(){return n.qy`
      <wui-flex flexDirection="row" fullWidth gap="s">
        ${this.isRequired?null:n.qy`<wui-button
              size="lg"
              variant="neutral"
              fullWidth
              .disabled=${this.loading}
              @click=${this.onSkip.bind(this)}
              >Skip this step</wui-button
            >`}

        <wui-button
          size="lg"
          variant="main"
          type="submit"
          fullWidth
          .disabled=${!this.email||!this.isValidEmail(this.email)}
          .loading=${this.loading}
          @click=${this.onSubmit.bind(this)}
        >
          Continue
        </wui-button>
      </wui-flex>
    `}async onSubmit(){if(!(this.siwx instanceof f.u))return void w.P.showError("ReownAuthentication is not initialized. Please contact support.");const t=g.W.getActiveCaipAddress();if(!t)throw new Error("Account is not connected.");if(this.isValidEmail(this.email))try{this.loading=!0;const e=await this.siwx.requestEmailOtp({email:this.email,account:t});this.pushRecentEmail(this.email),null===e.uuid?m.I.replace("SIWXSignMessage"):m.I.replace("DataCaptureOtpConfirm",{email:this.email})}catch(e){w.P.showError("Failed to send email OTP"),this.loading=!1}else w.P.showError("Please provide a valid email.")}onSkip(){m.I.replace("SIWXSignMessage")}getRecentEmails(){const t=b.Ud.getItem(b.Ws.RECENT_EMAILS);return(t?t.split(","):[]).filter(this.isValidEmail.bind(this)).slice(0,3)}pushRecentEmail(t){const e=this.getRecentEmails(),i=Array.from(new Set([t,...e])).slice(0,3);b.Ud.setItem(b.Ws.RECENT_EMAILS,i.join(","))}isValidEmail(t){return/^\S+@\S+\.\S+$/u.test(t)}};E.styles=[k],$([(0,o.wk)()],E.prototype,"email",void 0),$([(0,o.wk)()],E.prototype,"address",void 0),$([(0,o.wk)()],E.prototype,"loading",void 0),$([(0,o.wk)()],E.prototype,"appName",void 0),$([(0,o.wk)()],E.prototype,"siwx",void 0),$([(0,o.wk)()],E.prototype,"isRequired",void 0),$([(0,o.wk)()],E.prototype,"recentEmails",void 0),E=$([(0,s.EM)("w3m-data-capture-view")],E)},41722(t,e,i){i.d(e,{H:()=>$});var n=i(37022),o=i(56370),s=i(61139),r=i(25015),a=i(24657),l=i(7258),c=i(89268),u=(i(84107),i(43901),i(94582),i(52574),i(39446)),d=i(69929),h=i(37845);const p=i(89406).AH`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 48px;
    height: 48px;
    background: ${({tokens:t})=>t.theme.foregroundPrimary};
    border-radius: ${({borderRadius:t})=>t[4]};
    border: 1px solid ${({tokens:t})=>t.theme.borderPrimary};
    font-family: ${({fontFamily:t})=>t.regular};
    font-size: ${({textSize:t})=>t.large};
    line-height: 18px;
    letter-spacing: -0.16px;
    text-align: center;
    color: ${({tokens:t})=>t.theme.textPrimary};
    caret-color: ${({tokens:t})=>t.core.textAccentPrimary};
    transition:
      background-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      border-color ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]},
      box-shadow ${({durations:t})=>t.lg}
        ${({easings:t})=>t["ease-out-power-2"]};
    will-change: background-color, border-color, box-shadow;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: ${({spacing:t})=>t[4]};
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  input:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  input:focus-visible:enabled {
    background-color: transparent;
    border: 1px solid ${({tokens:t})=>t.theme.borderSecondary};
    box-shadow: 0px 0px 0px 4px ${({tokens:t})=>t.core.foregroundAccent040};
  }
`;var m=function(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};let g=class extends n.WF{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return n.qy`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};g.styles=[u.W5,u.fD,p],m([(0,o.MZ)({type:Boolean})],g.prototype,"disabled",void 0),m([(0,o.MZ)({type:String})],g.prototype,"value",void 0),g=m([(0,h.E)("wui-input-numeric")],g);const w=n.AH`
  :host {
    position: relative;
    display: block;
  }
`;var f=function(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};let y=class extends n.WF{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map(()=>""),this.numerics=[],this.shouldInputBeEnabled=t=>this.values.slice(0,t).every(t=>""!==t),this.handleKeyDown=(t,e)=>{const i=t.target,n=this.getInputElement(i);if(!n)return;["ArrowLeft","ArrowRight","Shift","Delete"].includes(t.key)&&t.preventDefault();const o=n.selectionStart;switch(t.key){case"ArrowLeft":o&&n.setSelectionRange(o+1,o+1),this.focusInputField("prev",e);break;case"ArrowRight":case"Shift":this.focusInputField("next",e);break;case"Delete":case"Backspace":""===n.value?this.focusInputField("prev",e):this.updateInput(n,e,"")}},this.focusInputField=(t,e)=>{if("next"===t){const t=e+1;if(!this.shouldInputBeEnabled(t))return;const i=this.numerics[t<this.length?t:e],n=i?this.getInputElement(i):void 0;n&&(n.disabled=!1,n.focus())}if("prev"===t){const t=e-1,i=this.numerics[t>-1?t:e],n=i?this.getInputElement(i):void 0;n&&n.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(""));const t=this.shadowRoot?.querySelectorAll("wui-input-numeric");t&&(this.numerics=Array.from(t)),this.numerics[0]?.focus()}render(){return n.qy`
      <wui-flex gap="1" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map((t,e)=>n.qy`
            <wui-input-numeric
              @input=${t=>this.handleInput(t,e)}
              @click=${t=>this.selectInput(t)}
              @keydown=${t=>this.handleKeyDown(t,e)}
              .disabled=${!this.shouldInputBeEnabled(e)}
              .value=${this.values[e]||""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `}updateInput(t,e,i){const n=this.numerics[e],o=t||(n?this.getInputElement(n):void 0);o&&(o.value=i,this.values=this.values.map((t,n)=>n===e?i:t))}selectInput(t){const e=t.target;if(e){const t=this.getInputElement(e);t?.select()}}handleInput(t,e){const i=t.target,n=this.getInputElement(i);if(n){const i=n.value;if("insertFromPaste"===t.inputType)this.handlePaste(n,i,e);else{d.Z.isNumber(i)&&t.data?(this.updateInput(n,e,t.data),this.focusInputField("next",e)):this.updateInput(n,e,"")}}this.dispatchInputChangeEvent()}handlePaste(t,e,i){const n=e[0];if(n&&d.Z.isNumber(n)){this.updateInput(t,i,n);const o=e.substring(1);if(i+1<this.length&&o.length){const t=this.numerics[i+1],e=t?this.getInputElement(t):void 0;e&&this.handlePaste(e,o,i+1)}else this.focusInputField("next",i)}else this.updateInput(t,i,"")}getInputElement(t){return t.shadowRoot?.querySelector("input")?t.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){const t=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:t,bubbles:!0,composed:!0}))}};y.styles=[u.W5,w],f([(0,o.MZ)({type:Number})],y.prototype,"length",void 0),f([(0,o.MZ)({type:String})],y.prototype,"otp",void 0),f([(0,o.wk)()],y.prototype,"values",void 0),y=f([(0,h.E)("wui-otp")],y);i(84875);var v=i(22538);const x=n.AH`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`;var b,k=function(t,e,i,n){var o,s=arguments.length,r=s<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)r=Reflect.decorate(t,e,i,n);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(r=(s<3?o(r):s>3?o(e,i,r):o(e,i))||r);return s>3&&r&&Object.defineProperty(e,i,r),r};let $=b=class extends n.WF{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=v.Q.getTimeToNextEmailLogin(),this.error="",this.otp="",this.email=s.I.state.data?.email,this.authConnector=r.a.getAuthConnector()}render(){if(!this.email)throw new Error("w3m-email-otp-widget: No email provided");const t=Boolean(this.timeoutTimeLeft),e=this.getFooterLabels(t);return n.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["4","0","4","0"]}
        gap="4"
      >
        <wui-flex
          class="email-display"
          flexDirection="column"
          alignItems="center"
          .padding=${["0","5","0","5"]}
        >
          <wui-text variant="md-regular" color="primary" align="center">
            Enter the code we sent to
          </wui-text>
          <wui-text variant="md-medium" color="primary" lineClamp="1" align="center">
            ${this.email}
          </wui-text>
        </wui-flex>

        <wui-text variant="sm-regular" color="secondary">The code expires in 20 minutes</wui-text>

        ${this.loading?n.qy`<wui-loading-spinner size="xl" color="accent-primary"></wui-loading-spinner>`:n.qy` <wui-flex flexDirection="column" alignItems="center" gap="2">
              <wui-otp
                dissabled
                length="6"
                @inputChange=${this.onOtpInputChange.bind(this)}
                .otp=${this.otp}
              ></wui-otp>
              ${this.error?n.qy`
                    <wui-text variant="sm-regular" align="center" color="error">
                      ${this.error}. Try Again
                    </wui-text>
                  `:null}
            </wui-flex>`}

        <wui-flex alignItems="center" gap="2">
          <wui-text variant="sm-regular" color="secondary">${e.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${t}>
            ${e.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}startOTPTimeout(){this.timeoutTimeLeft=v.Q.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=v.Q.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}async onOtpInputChange(t){try{this.loading||(this.otp=t.detail,this.shouldSubmitOnOtpChange()&&(this.loading=!0,await(this.onOtpSubmit?.(this.otp))))}catch(e){this.error=a.w.parseError(e),this.loading=!1}}async onResendCode(){try{if(this.onOtpResend){if(!this.loading&&!this.timeoutTimeLeft){this.error="",this.otp="";if(!r.a.getAuthConnector()||!this.email)throw new Error("w3m-email-otp-widget: Unable to resend email");this.loading=!0,await this.onOtpResend(this.email),this.startOTPTimeout(),l.P.showSuccess("Code email resent")}}else this.onStartOver&&this.onStartOver()}catch(t){l.P.showError(t)}finally{this.loading=!1}}getFooterLabels(t){return this.onStartOver?{title:"Something wrong?",action:"Try again "+(t?`in ${this.timeoutTimeLeft}s`:"")}:{title:"Didn't receive it?",action:"Resend "+(t?`in ${this.timeoutTimeLeft}s`:"Code")}}shouldSubmitOnOtpChange(){return this.authConnector&&this.otp.length===b.OTP_LENGTH}};$.OTP_LENGTH=6,$.styles=x,k([(0,o.wk)()],$.prototype,"loading",void 0),k([(0,o.wk)()],$.prototype,"timeoutTimeLeft",void 0),k([(0,o.wk)()],$.prototype,"error",void 0),$=b=k([(0,c.EM)("w3m-email-otp-widget")],$)}}]);
//# sourceMappingURL=3151.1047dc35.chunk.js.map