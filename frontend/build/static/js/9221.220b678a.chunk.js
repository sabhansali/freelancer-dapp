"use strict";(globalThis.webpackChunkfreelancer_dapp_frontend||=[]).push([[9221],{79221(e,t,i){i.r(t),i.d(t,{W3mEmailLoginView:()=>S,W3mEmailOtpWidget:()=>h.H,W3mEmailVerifyDeviceView:()=>E,W3mEmailVerifyOtpView:()=>m,W3mUpdateEmailPrimaryOtpView:()=>k,W3mUpdateEmailSecondaryOtpView:()=>R,W3mUpdateEmailWalletView:()=>O});var n=i(17321),r=i(93022),o=i(71786),a=i(79323),s=i(73609),l=i(61139),c=i(7258),u=i(24657),d=i(89268),h=i(41722),p=function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};let m=class extends h.H{constructor(){super(...arguments),this.onOtpSubmit=async e=>{try{if(this.authConnector){const t=n.W.state.activeChain,i=r.x.getConnections(t),u=o.H.state.remoteFeatures?.multiWallet,d=i.length>0;if(await this.authConnector.provider.connectOtp({otp:e}),a.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),!t)throw new Error("Active chain is not set on ChainController");if(await r.x.connectExternal(this.authConnector,t),o.H.state.remoteFeatures?.emailCapture)return;if(o.H.state.siwx)return void s.W.close();if(d&&u)return l.I.replace("ProfileWallets"),void c.P.showSuccess("New Wallet Added");s.W.close()}}catch(t){throw a.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:u.w.parseError(t)}}),t}},this.onOtpResend=async e=>{this.authConnector&&(await this.authConnector.provider.connectEmail({email:e}),a.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}))}}};m=p([(0,d.EM)("w3m-email-verify-otp-view")],m);var w=i(37022),f=i(56370),g=i(25015);i(84107),i(60677),i(43901),i(84875);const v=d.AH`
  wui-icon-box {
    height: ${({spacing:e})=>e[16]};
    width: ${({spacing:e})=>e[16]};
  }
`;var y=function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};let E=class extends w.WF{constructor(){super(),this.email=l.I.state.data?.email,this.authConnector=g.a.getAuthConnector(),this.loading=!1,this.listenForDeviceApproval()}render(){if(!this.email)throw new Error("w3m-email-verify-device-view: No email provided");if(!this.authConnector)throw new Error("w3m-email-verify-device-view: No auth connector provided");return w.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["6","3","6","3"]}
        gap="4"
      >
        <wui-icon-box size="xl" color="accent-primary" icon="sealCheck"></wui-icon-box>

        <wui-flex flexDirection="column" alignItems="center" gap="3">
          <wui-flex flexDirection="column" alignItems="center">
            <wui-text variant="md-regular" color="primary">
              Approve the login link we sent to
            </wui-text>
            <wui-text variant="md-regular" color="primary"><b>${this.email}</b></wui-text>
          </wui-flex>

          <wui-text variant="sm-regular" color="secondary" align="center">
            The code expires in 20 minutes
          </wui-text>

          <wui-flex alignItems="center" id="w3m-resend-section" gap="2">
            <wui-text variant="sm-regular" color="primary" align="center">
              Didn't receive it?
            </wui-text>
            <wui-link @click=${this.onResendCode.bind(this)} .disabled=${this.loading}>
              Resend email
            </wui-link>
          </wui-flex>
        </wui-flex>
      </wui-flex>
    `}async listenForDeviceApproval(){if(this.authConnector)try{await this.authConnector.provider.connectDevice(),a.E.sendEvent({type:"track",event:"DEVICE_REGISTERED_FOR_EMAIL"}),a.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_SENT"}),l.I.replace("EmailVerifyOtp",{email:this.email})}catch(e){l.I.goBack()}}async onResendCode(){try{if(!this.loading){if(!this.authConnector||!this.email)throw new Error("w3m-email-login-widget: Unable to resend email");this.loading=!0,await this.authConnector.provider.connectEmail({email:this.email}),this.listenForDeviceApproval(),c.P.showSuccess("Code email resent")}}catch(e){c.P.showError(e)}finally{this.loading=!1}}};E.styles=v,y([(0,f.wk)()],E.prototype,"loading",void 0),E=y([(0,d.EM)("w3m-email-verify-device-view")],E);var b=i(94657);i(92016),i(47438);const I=w.AH`
  wui-email-input {
    width: 100%;
  }

  form {
    width: 100%;
    display: block;
    position: relative;
  }
`;var x=function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};let O=class extends w.WF{constructor(){super(...arguments),this.formRef=(0,b._)(),this.initialEmail=l.I.state.data?.email??"",this.redirectView=l.I.state.data?.redirectView,this.email="",this.loading=!1}firstUpdated(){this.formRef.value?.addEventListener("keydown",e=>{"Enter"===e.key&&this.onSubmitEmail(e)})}render(){return w.qy`
      <wui-flex flexDirection="column" padding="4" gap="4">
        <form ${(0,b.K)(this.formRef)} @submit=${this.onSubmitEmail.bind(this)}>
          <wui-email-input
            value=${this.initialEmail}
            .disabled=${this.loading}
            @inputChange=${this.onEmailInputChange.bind(this)}
          >
          </wui-email-input>
          <input type="submit" hidden />
        </form>
        ${this.buttonsTemplate()}
      </wui-flex>
    `}onEmailInputChange(e){this.email=e.detail}async onSubmitEmail(e){try{if(this.loading)return;this.loading=!0,e.preventDefault();const t=g.a.getAuthConnector();if(!t)throw new Error("w3m-update-email-wallet: Auth connector not found");const i=await t.provider.updateEmail({email:this.email});a.E.sendEvent({type:"track",event:"EMAIL_EDIT"}),"VERIFY_SECONDARY_OTP"===i.action?l.I.push("UpdateEmailSecondaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView}):l.I.push("UpdateEmailPrimaryOtp",{email:this.initialEmail,newEmail:this.email,redirectView:this.redirectView})}catch(t){c.P.showError(t),this.loading=!1}}buttonsTemplate(){const e=!this.loading&&this.email.length>3&&this.email!==this.initialEmail;return this.redirectView?w.qy`
      <wui-flex gap="3">
        <wui-button size="md" variant="neutral" fullWidth @click=${l.I.goBack}>
          Cancel
        </wui-button>

        <wui-button
          size="md"
          variant="accent-primary"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      </wui-flex>
    `:w.qy`
        <wui-button
          size="md"
          variant="accent-primary"
          fullWidth
          @click=${this.onSubmitEmail.bind(this)}
          .disabled=${!e}
          .loading=${this.loading}
        >
          Save
        </wui-button>
      `}};O.styles=I,x([(0,f.wk)()],O.prototype,"email",void 0),x([(0,f.wk)()],O.prototype,"loading",void 0),O=x([(0,d.EM)("w3m-update-email-wallet-view")],O);var C=function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};let k=class extends h.H{constructor(){super(),this.email=l.I.state.data?.email,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailPrimaryOtp({otp:e}),a.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),l.I.replace("UpdateEmailSecondaryOtp",l.I.state.data))}catch(t){throw a.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:u.w.parseError(t)}}),t}},this.onStartOver=()=>{l.I.replace("UpdateEmailWallet",l.I.state.data)}}};k=C([(0,d.EM)("w3m-update-email-primary-otp-view")],k);var A=function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};let R=class extends h.H{constructor(){super(),this.email=l.I.state.data?.newEmail,this.redirectView=l.I.state.data?.redirectView,this.onOtpSubmit=async e=>{try{this.authConnector&&(await this.authConnector.provider.updateEmailSecondaryOtp({otp:e}),a.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_PASS"}),this.redirectView&&l.I.reset(this.redirectView))}catch(t){throw a.E.sendEvent({type:"track",event:"EMAIL_VERIFICATION_CODE_FAIL",properties:{message:u.w.parseError(t)}}),t}},this.onStartOver=()=>{l.I.replace("UpdateEmailWallet",l.I.state.data)}}};R=A([(0,d.EM)("w3m-update-email-secondary-otp-view")],R);var T=i(80883),$=i(32819),P=function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};let S=class extends w.WF{constructor(){super(),this.authConnector=g.a.getAuthConnector(),this.isEmailEnabled=o.H.state.remoteFeatures?.email,this.isAuthEnabled=this.checkIfAuthEnabled(g.a.state.connectors),this.connectors=g.a.state.connectors,g.a.subscribeKey("connectors",e=>{this.connectors=e,this.isAuthEnabled=this.checkIfAuthEnabled(this.connectors)})}render(){if(!this.isEmailEnabled)throw new Error("w3m-email-login-view: Email is not enabled");if(!this.isAuthEnabled)throw new Error("w3m-email-login-view: No auth connector provided");return w.qy`<wui-flex flexDirection="column" .padding=${["1","3","3","3"]} gap="4">
      <w3m-email-login-widget></w3m-email-login-widget>
    </wui-flex> `}checkIfAuthEnabled(e){const t=e.filter(e=>e.type===$.o.CONNECTOR_TYPE_AUTH).map(e=>e.chain);return T.o.AUTH_CONNECTOR_SUPPORTED_CHAINS.some(e=>t.includes(e))}};P([(0,f.wk)()],S.prototype,"connectors",void 0),S=P([(0,d.EM)("w3m-email-login-view")],S)},41722(e,t,i){i.d(t,{H:()=>x});var n=i(37022),r=i(56370),o=i(61139),a=i(25015),s=i(24657),l=i(7258),c=i(89268),u=(i(84107),i(43901),i(94582),i(52574),i(39446)),d=i(69929),h=i(37845);const p=i(89406).AH`
  :host {
    position: relative;
    display: inline-block;
  }

  input {
    width: 48px;
    height: 48px;
    background: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[4]};
    border: 1px solid ${({tokens:e})=>e.theme.borderPrimary};
    font-family: ${({fontFamily:e})=>e.regular};
    font-size: ${({textSize:e})=>e.large};
    line-height: 18px;
    letter-spacing: -0.16px;
    text-align: center;
    color: ${({tokens:e})=>e.theme.textPrimary};
    caret-color: ${({tokens:e})=>e.core.textAccentPrimary};
    transition:
      background-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      border-color ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]},
      box-shadow ${({durations:e})=>e.lg}
        ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color, border-color, box-shadow;
    box-sizing: border-box;
    -webkit-appearance: none;
    -moz-appearance: textfield;
    padding: ${({spacing:e})=>e[4]};
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
    border: 1px solid ${({tokens:e})=>e.theme.borderSecondary};
    box-shadow: 0px 0px 0px 4px ${({tokens:e})=>e.core.foregroundAccent040};
  }
`;var m=function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};let w=class extends n.WF{constructor(){super(...arguments),this.disabled=!1,this.value=""}render(){return n.qy`<input
      type="number"
      maxlength="1"
      inputmode="numeric"
      autofocus
      ?disabled=${this.disabled}
      value=${this.value}
    /> `}};w.styles=[u.W5,u.fD,p],m([(0,r.MZ)({type:Boolean})],w.prototype,"disabled",void 0),m([(0,r.MZ)({type:String})],w.prototype,"value",void 0),w=m([(0,h.E)("wui-input-numeric")],w);const f=n.AH`
  :host {
    position: relative;
    display: block;
  }
`;var g=function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};let v=class extends n.WF{constructor(){super(...arguments),this.length=6,this.otp="",this.values=Array.from({length:this.length}).map(()=>""),this.numerics=[],this.shouldInputBeEnabled=e=>this.values.slice(0,e).every(e=>""!==e),this.handleKeyDown=(e,t)=>{const i=e.target,n=this.getInputElement(i);if(!n)return;["ArrowLeft","ArrowRight","Shift","Delete"].includes(e.key)&&e.preventDefault();const r=n.selectionStart;switch(e.key){case"ArrowLeft":r&&n.setSelectionRange(r+1,r+1),this.focusInputField("prev",t);break;case"ArrowRight":case"Shift":this.focusInputField("next",t);break;case"Delete":case"Backspace":""===n.value?this.focusInputField("prev",t):this.updateInput(n,t,"")}},this.focusInputField=(e,t)=>{if("next"===e){const e=t+1;if(!this.shouldInputBeEnabled(e))return;const i=this.numerics[e<this.length?e:t],n=i?this.getInputElement(i):void 0;n&&(n.disabled=!1,n.focus())}if("prev"===e){const e=t-1,i=this.numerics[e>-1?e:t],n=i?this.getInputElement(i):void 0;n&&n.focus()}}}firstUpdated(){this.otp&&(this.values=this.otp.split(""));const e=this.shadowRoot?.querySelectorAll("wui-input-numeric");e&&(this.numerics=Array.from(e)),this.numerics[0]?.focus()}render(){return n.qy`
      <wui-flex gap="1" data-testid="wui-otp-input">
        ${Array.from({length:this.length}).map((e,t)=>n.qy`
            <wui-input-numeric
              @input=${e=>this.handleInput(e,t)}
              @click=${e=>this.selectInput(e)}
              @keydown=${e=>this.handleKeyDown(e,t)}
              .disabled=${!this.shouldInputBeEnabled(t)}
              .value=${this.values[t]||""}
            >
            </wui-input-numeric>
          `)}
      </wui-flex>
    `}updateInput(e,t,i){const n=this.numerics[t],r=e||(n?this.getInputElement(n):void 0);r&&(r.value=i,this.values=this.values.map((e,n)=>n===t?i:e))}selectInput(e){const t=e.target;if(t){const e=this.getInputElement(t);e?.select()}}handleInput(e,t){const i=e.target,n=this.getInputElement(i);if(n){const i=n.value;if("insertFromPaste"===e.inputType)this.handlePaste(n,i,t);else{d.Z.isNumber(i)&&e.data?(this.updateInput(n,t,e.data),this.focusInputField("next",t)):this.updateInput(n,t,"")}}this.dispatchInputChangeEvent()}handlePaste(e,t,i){const n=t[0];if(n&&d.Z.isNumber(n)){this.updateInput(e,i,n);const r=t.substring(1);if(i+1<this.length&&r.length){const e=this.numerics[i+1],t=e?this.getInputElement(e):void 0;t&&this.handlePaste(t,r,i+1)}else this.focusInputField("next",i)}else this.updateInput(e,i,"")}getInputElement(e){return e.shadowRoot?.querySelector("input")?e.shadowRoot.querySelector("input"):null}dispatchInputChangeEvent(){const e=this.values.join("");this.dispatchEvent(new CustomEvent("inputChange",{detail:e,bubbles:!0,composed:!0}))}};v.styles=[u.W5,f],g([(0,r.MZ)({type:Number})],v.prototype,"length",void 0),g([(0,r.MZ)({type:String})],v.prototype,"otp",void 0),g([(0,r.wk)()],v.prototype,"values",void 0),v=g([(0,h.E)("wui-otp")],v);i(84875);var y=i(22538);const E=n.AH`
  wui-loading-spinner {
    margin: 9px auto;
  }

  .email-display,
  .email-display wui-text {
    max-width: 100%;
  }
`;var b,I=function(e,t,i,n){var r,o=arguments.length,a=o<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,i):n;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,i,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(a=(o<3?r(a):o>3?r(t,i,a):r(t,i))||a);return o>3&&a&&Object.defineProperty(t,i,a),a};let x=b=class extends n.WF{firstUpdated(){this.startOTPTimeout()}disconnectedCallback(){clearTimeout(this.OTPTimeout)}constructor(){super(),this.loading=!1,this.timeoutTimeLeft=y.Q.getTimeToNextEmailLogin(),this.error="",this.otp="",this.email=o.I.state.data?.email,this.authConnector=a.a.getAuthConnector()}render(){if(!this.email)throw new Error("w3m-email-otp-widget: No email provided");const e=Boolean(this.timeoutTimeLeft),t=this.getFooterLabels(e);return n.qy`
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
          <wui-text variant="sm-regular" color="secondary">${t.title}</wui-text>
          <wui-link @click=${this.onResendCode.bind(this)} .disabled=${e}>
            ${t.action}
          </wui-link>
        </wui-flex>
      </wui-flex>
    `}startOTPTimeout(){this.timeoutTimeLeft=y.Q.getTimeToNextEmailLogin(),this.OTPTimeout=setInterval(()=>{this.timeoutTimeLeft>0?this.timeoutTimeLeft=y.Q.getTimeToNextEmailLogin():clearInterval(this.OTPTimeout)},1e3)}async onOtpInputChange(e){try{this.loading||(this.otp=e.detail,this.shouldSubmitOnOtpChange()&&(this.loading=!0,await(this.onOtpSubmit?.(this.otp))))}catch(t){this.error=s.w.parseError(t),this.loading=!1}}async onResendCode(){try{if(this.onOtpResend){if(!this.loading&&!this.timeoutTimeLeft){this.error="",this.otp="";if(!a.a.getAuthConnector()||!this.email)throw new Error("w3m-email-otp-widget: Unable to resend email");this.loading=!0,await this.onOtpResend(this.email),this.startOTPTimeout(),l.P.showSuccess("Code email resent")}}else this.onStartOver&&this.onStartOver()}catch(e){l.P.showError(e)}finally{this.loading=!1}}getFooterLabels(e){return this.onStartOver?{title:"Something wrong?",action:"Try again "+(e?`in ${this.timeoutTimeLeft}s`:"")}:{title:"Didn't receive it?",action:"Resend "+(e?`in ${this.timeoutTimeLeft}s`:"Code")}}shouldSubmitOnOtpChange(){return this.authConnector&&this.otp.length===b.OTP_LENGTH}};x.OTP_LENGTH=6,x.styles=E,I([(0,r.wk)()],x.prototype,"loading",void 0),I([(0,r.wk)()],x.prototype,"timeoutTimeLeft",void 0),I([(0,r.wk)()],x.prototype,"error",void 0),x=b=I([(0,c.EM)("w3m-email-otp-widget")],x)}}]);
//# sourceMappingURL=9221.220b678a.chunk.js.map