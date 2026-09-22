"use strict";(globalThis.webpackChunkfreelancer_dapp_frontend=globalThis.webpackChunkfreelancer_dapp_frontend||[]).push([[9520],{89520(e,t,r){r.r(t),r.d(t,{AppKitModal:()=>pe,W3mListWallet:()=>fe,W3mModal:()=>ue,W3mModalBase:()=>de,W3mRouterContainer:()=>xe,W3mUsageExceededView:()=>we});var o=r(37022),i=r(56370),a=r(56440),n=r(71786),s=r(73609),l=r(17321),c=r(25015),d=r(16496),u=r(61139),p=r(93022),h=r(13237);const m={isUnsupportedChainView:()=>"UnsupportedChain"===u.I.state.view||"SwitchNetwork"===u.I.state.view&&u.I.state.history.includes("UnsupportedChain"),async safeClose(){if(this.isUnsupportedChainView())return void s.W.shake();await h.U.isSIWXCloseDisabled()?s.W.shake():("DataCapture"!==u.I.state.view&&"DataCaptureOtpConfirm"!==u.I.state.view||p.x.disconnect(),s.W.close())}};var w=r(36141),g=r(7258),b=r(77905),y=r(89268),f=r(39446),v=r(37845),k=r(89406);const x=k.AH`
  :host {
    display: block;
    border-radius: clamp(0px, ${e=>{let{borderRadius:t}=e;return t[8]}}, 44px);
    box-shadow: 0 0 0 1px ${e=>{let{tokens:t}=e;return t.theme.foregroundPrimary}};
    overflow: hidden;
  }
`;var $=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};let C=class extends o.WF{render(){return o.qy`<slot></slot>`}};C.styles=[f.W5,x],C=$([(0,v.E)("wui-card")],C);r(84107);var S=r(63542);r(18820),r(7836),r(52574);const W=k.AH`
  :host {
    width: 100%;
  }

  :host > wui-flex {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${e=>{let{spacing:t}=e;return t[2]}};
    padding: ${e=>{let{spacing:t}=e;return t[3]}};
    border-radius: ${e=>{let{borderRadius:t}=e;return t[6]}};
    border: 1px solid ${e=>{let{tokens:t}=e;return t.theme.borderPrimary}};
    box-sizing: border-box;
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundPrimary}};
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
    color: ${e=>{let{tokens:t}=e;return t.theme.textPrimary}};
  }

  :host > wui-flex[data-type='info'] {
    .icon-box {
      background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};

      wui-icon {
        color: ${e=>{let{tokens:t}=e;return t.theme.iconDefault}};
      }
    }
  }
  :host > wui-flex[data-type='success'] {
    .icon-box {
      background-color: ${e=>{let{tokens:t}=e;return t.core.backgroundSuccess}};

      wui-icon {
        color: ${e=>{let{tokens:t}=e;return t.core.borderSuccess}};
      }
    }
  }
  :host > wui-flex[data-type='warning'] {
    .icon-box {
      background-color: ${e=>{let{tokens:t}=e;return t.core.backgroundWarning}};

      wui-icon {
        color: ${e=>{let{tokens:t}=e;return t.core.borderWarning}};
      }
    }
  }
  :host > wui-flex[data-type='error'] {
    .icon-box {
      background-color: ${e=>{let{tokens:t}=e;return t.core.backgroundError}};

      wui-icon {
        color: ${e=>{let{tokens:t}=e;return t.core.borderError}};
      }
    }
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
    color: ${e=>{let{tokens:t}=e;return t.theme.iconDefault}};
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: ${e=>{let{borderRadius:t}=e;return t[2]}};
    background-color: var(--local-icon-bg-value);
  }
`;var I=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};const P={info:"info",success:"checkmark",warning:"warningCircle",error:"warning"};let R=class extends o.WF{constructor(){super(...arguments),this.message="",this.type="info"}render(){return o.qy`
      <wui-flex
        data-type=${(0,a.J)(this.type)}
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        gap="2"
      >
        <wui-flex columnGap="2" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color="inherit" size="md" name=${P[this.type]}></wui-icon>
          </wui-flex>
          <wui-text variant="md-medium" color="inherit" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="inherit"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){S.h.close()}};R.styles=[f.W5,W],I([(0,i.MZ)()],R.prototype,"message",void 0),I([(0,i.MZ)()],R.prototype,"type",void 0),R=I([(0,v.E)("wui-alertbar")],R);const A=y.AH`
  :host {
    display: block;
    position: absolute;
    top: ${e=>{let{spacing:t}=e;return t[3]}};
    left: ${e=>{let{spacing:t}=e;return t[4]}};
    right: ${e=>{let{spacing:t}=e;return t[4]}};
    opacity: 0;
    pointer-events: none;
  }
`;var E=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};const O={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"warning"}};let N=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.open=S.h.state.open,this.onOpen(!0),this.unsubscribe.push(S.h.subscribeKey("open",e=>{this.open=e,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const{message:e,variant:t}=S.h.state,r=O[t];return o.qy`
      <wui-alertbar
        message=${e}
        backgroundColor=${r?.backgroundColor}
        iconColor=${r?.iconColor}
        icon=${r?.icon}
        type=${t}
      ></wui-alertbar>
    `}onOpen(e){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):e||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};N.styles=A,E([(0,i.wk)()],N.prototype,"open",void 0),N=E([(0,y.EM)("w3m-alertbar")],N);var z=r(1348),T=r(36596),D=r(79323);r(90616),r(71056);const M=k.AH`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: ${e=>{let{spacing:t}=e;return t[1]}};
    transition: background-color ${e=>{let{durations:t}=e;return t.lg}}
      ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
    will-change: background-color;
    border-radius: ${e=>{let{borderRadius:t}=e;return t[32]}};
  }

  wui-image {
    border-radius: 100%;
  }

  wui-text {
    padding-left: ${e=>{let{spacing:t}=e;return t[1]}};
  }

  .left-icon-container,
  .right-icon-container {
    width: 24px;
    height: 24px;
    justify-content: center;
    align-items: center;
  }

  wui-icon {
    color: ${e=>{let{tokens:t}=e;return t.theme.iconDefault}};
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='lg'] {
    height: 32px;
  }

  button[data-size='md'] {
    height: 28px;
  }

  button[data-size='sm'] {
    height: 24px;
  }

  button[data-size='lg'] wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] wui-image {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='lg'] .left-icon-container {
    width: 24px;
    height: 24px;
  }

  button[data-size='md'] .left-icon-container {
    width: 20px;
    height: 20px;
  }

  button[data-size='sm'] .left-icon-container {
    width: 16px;
    height: 16px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-type='filled-dropdown'] {
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundPrimary}};
  }

  button[data-type='text-dropdown'] {
    background-color: transparent;
  }

  /* -- Focus states --------------------------------------------------- */
  button:focus-visible:enabled {
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
    box-shadow: 0 0 0 4px ${e=>{let{tokens:t}=e;return t.core.foregroundAccent040}};
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled,
    button:active:enabled {
      background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
    }
  }

  /* -- Disabled states --------------------------------------------------- */
  button:disabled {
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
    opacity: 0.5;
  }
`;var H=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};const j={lg:"lg-regular",md:"md-regular",sm:"sm-regular"},F={lg:"lg",md:"md",sm:"sm"};let B=class extends o.WF{constructor(){super(...arguments),this.imageSrc="",this.text="",this.size="lg",this.type="text-dropdown",this.disabled=!1}render(){return o.qy`<button ?disabled=${this.disabled} data-size=${this.size} data-type=${this.type}>
      ${this.imageTemplate()} ${this.textTemplate()}
      <wui-flex class="right-icon-container">
        <wui-icon name="chevronBottom"></wui-icon>
      </wui-flex>
    </button>`}textTemplate(){const e=j[this.size];return this.text?o.qy`<wui-text color="primary" variant=${e}>${this.text}</wui-text>`:null}imageTemplate(){if(this.imageSrc)return o.qy`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`;const e=F[this.size];return o.qy` <wui-flex class="left-icon-container">
      <wui-icon size=${e} name="networkPlaceholder"></wui-icon>
    </wui-flex>`}};B.styles=[f.W5,f.fD,M],H([(0,i.MZ)()],B.prototype,"imageSrc",void 0),H([(0,i.MZ)()],B.prototype,"text",void 0),H([(0,i.MZ)()],B.prototype,"size",void 0),H([(0,i.MZ)()],B.prototype,"type",void 0),H([(0,i.MZ)({type:Boolean})],B.prototype,"disabled",void 0),B=H([(0,v.E)("wui-select")],B);r(85098),r(84875);var L=r(91391),q=r(66538);const Z=y.AH`
  wui-image {
    border-radius: ${e=>{let{borderRadius:t}=e;return t.round}};
  }

  .transfers-badge {
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundPrimary}};
    border: 1px solid ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
    border-radius: ${e=>{let{borderRadius:t}=e;return t[4]}};
  }
`;var V=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};let U=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.paymentAsset=q.PayController.state.paymentAsset,this.amount=q.PayController.state.amount,this.unsubscribe.push(q.PayController.subscribeKey("paymentAsset",e=>{this.paymentAsset=e}),q.PayController.subscribeKey("amount",e=>{this.amount=e}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=l.W.getAllRequestedCaipNetworks().find(e=>e.caipNetworkId===this.paymentAsset.network);return o.qy`<wui-flex
      alignItems="center"
      gap="1"
      .padding=${["1","2","1","1"]}
      class="transfers-badge"
    >
      <wui-image src=${(0,a.J)(this.paymentAsset.metadata.logoURI)} size="xl"></wui-image>
      <wui-text variant="lg-regular" color="primary">
        ${this.amount} ${this.paymentAsset.metadata.symbol}
      </wui-text>
      <wui-text variant="sm-regular" color="secondary">
        on ${e?.name??"Unknown"}
      </wui-text>
    </wui-flex>`}};U.styles=[Z],V([(0,i.MZ)()],U.prototype,"paymentAsset",void 0),V([(0,i.MZ)()],U.prototype,"amount",void 0),U=V([(0,y.EM)("w3m-pay-header")],U);const K=y.AH`
  :host {
    height: 60px;
  }

  :host > wui-flex {
    box-sizing: border-box;
    background-color: var(--local-header-background-color);
  }

  wui-text {
    background-color: var(--local-header-background-color);
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}},
      slide-down-in 120ms forwards ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}},
      slide-up-in 120ms forwards ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
    animation-delay: 0ms, 200ms;
  }

  wui-icon-button[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;var Y=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};const X=["SmartSessionList"],J={PayWithExchange:y.f.tokens.theme.foregroundPrimary};function _(){const e=u.I.state.data?.connector?.name,t=u.I.state.data?.wallet?.name,r=u.I.state.data?.network?.name,o=t??e,i=c.a.getConnectors(),a=1===i.length&&"w3m-email"===i[0]?.id,n=l.W.getAccountData()?.socialProvider;return{Connect:`Connect ${a?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",UsageExceeded:"Usage Exceeded",ConnectingExternal:o??"Connect Wallet",ConnectingWalletConnect:o??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview Convert",Downloads:o?`Get ${o}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a Wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Pay:"How you pay",ProfileWallets:"Wallets",SwitchNetwork:r??"Switch Network",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade Your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose Name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select Token",SwapPreview:"Preview Swap",WalletSend:"Send",WalletSendPreview:"Review Send",WalletSendSelectToken:"Select Token",WalletSendConfirmed:"Confirmed",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a Wallet?",ConnectWallets:"Connect Wallet",ConnectSocials:"All Socials",ConnectingSocial:n?n.charAt(0).toUpperCase()+n.slice(1):"Connect Social",ConnectingMultiChain:"Select Chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch Chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In",PayLoading:"Processing payment...",PayQuote:"Payment Quote",DataCapture:"Profile",DataCaptureOtpConfirm:"Confirm Email",FundWallet:"Fund Wallet",PayWithExchange:"Deposit from Exchange",PayWithExchangeSelectAsset:"Select Asset",SmartAccountSettings:"Smart Account Settings"}}let G=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.heading=_()[u.I.state.view],this.network=l.W.state.activeCaipNetwork,this.networkImage=z.$.getNetworkImage(this.network),this.showBack=!1,this.prevHistoryLength=1,this.view=u.I.state.view,this.viewDirection="",this.unsubscribe.push(T.j.subscribeNetworkImages(()=>{this.networkImage=z.$.getNetworkImage(this.network)}),u.I.subscribeKey("view",e=>{setTimeout(()=>{this.view=e,this.heading=_()[e]},L.o.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),l.W.subscribeKey("activeCaipNetwork",e=>{this.network=e,this.networkImage=z.$.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(e=>e())}render(){const e=J[u.I.state.view]??y.f.tokens.theme.backgroundPrimary;return this.style.setProperty("--local-header-background-color",e),o.qy`
      <wui-flex
        .padding=${["0","4","0","4"]}
        justifyContent="space-between"
        alignItems="center"
      >
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){D.E.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),u.I.push("WhatIsAWallet")}async onClose(){await m.safeClose()}rightHeaderTemplate(){const e=n.H?.state?.features?.smartSessions;return"Account"===u.I.state.view&&e?o.qy`<wui-flex>
      <wui-icon-button
        icon="clock"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${()=>u.I.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-button>
      ${this.closeButtonTemplate()}
    </wui-flex> `:this.closeButtonTemplate()}closeButtonTemplate(){return o.qy`
      <wui-icon-button
        icon="close"
        size="lg"
        type="neutral"
        variant="primary"
        iconSize="lg"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-button>
    `}titleTemplate(){if("PayQuote"===this.view)return o.qy`<w3m-pay-header></w3m-pay-header>`;const e=X.includes(this.view);return o.qy`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="2"
      >
        <wui-text
          display="inline"
          variant="lg-regular"
          color="primary"
          data-testid="w3m-header-text"
        >
          ${this.heading}
        </wui-text>
        ${e?o.qy`<wui-tag variant="accent" size="md">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){const{view:e}=u.I.state,t="Connect"===e,r=n.H.state.enableEmbedded,i="ApproveTransaction"===e,s="ConnectingSiwe"===e,l="Account"===e,c=n.H.state.enableNetworkSwitch,d=i||s||t&&r;return l&&c?o.qy`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${(0,a.J)(this.network?.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${(0,a.J)(this.networkImage)}
      ></wui-select>`:this.showBack&&!d?o.qy`<wui-icon-button
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        size="lg"
        iconSize="lg"
        type="neutral"
        variant="primary"
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-button>`:o.qy`<wui-icon-button
      data-hidden=${!t}
      id="dynamic"
      icon="helpCircle"
      size="lg"
      iconSize="lg"
      type="neutral"
      variant="primary"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-button>`}onNetworks(){this.isAllowedNetworkSwitch()&&(D.E.sendEvent({type:"track",event:"CLICK_NETWORKS"}),u.I.push("Networks"))}isAllowedNetworkSwitch(){const e=l.W.getAllRequestedCaipNetworks(),t=!!e&&e.length>1,r=e?.find(e=>{let{id:t}=e;return t===this.network?.id});return t||!r}onViewChange(){const{history:e}=u.I.state;let t=L.o.VIEW_DIRECTION.Next;e.length<this.prevHistoryLength&&(t=L.o.VIEW_DIRECTION.Prev),this.prevHistoryLength=e.length,this.viewDirection=t}async onHistoryChange(){const{history:e}=u.I.state,t=this.shadowRoot?.querySelector("#dynamic");e.length>1&&!this.showBack&&t?(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):e.length<=1&&this.showBack&&t&&(await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){u.I.goBack()}};G.styles=K,Y([(0,i.wk)()],G.prototype,"heading",void 0),Y([(0,i.wk)()],G.prototype,"network",void 0),Y([(0,i.wk)()],G.prototype,"networkImage",void 0),Y([(0,i.wk)()],G.prototype,"showBack",void 0),Y([(0,i.wk)()],G.prototype,"prevHistoryLength",void 0),Y([(0,i.wk)()],G.prototype,"view",void 0),Y([(0,i.wk)()],G.prototype,"viewDirection",void 0),G=Y([(0,y.EM)("w3m-header")],G);r(23723),r(90702);const Q=k.AH`
  :host {
    display: flex;
    align-items: center;
    gap: ${e=>{let{spacing:t}=e;return t[1]}};
    padding: ${e=>{let{spacing:t}=e;return t[2]}} ${e=>{let{spacing:t}=e;return t[3]}}
      ${e=>{let{spacing:t}=e;return t[2]}} ${e=>{let{spacing:t}=e;return t[2]}};
    border-radius: ${e=>{let{borderRadius:t}=e;return t[20]}};
    background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundPrimary}};
    box-shadow:
      0px 0px 8px 0px rgba(0, 0, 0, 0.1),
      inset 0 0 0 1px ${e=>{let{tokens:t}=e;return t.theme.borderPrimary}};
    max-width: 320px;
  }

  wui-icon-box {
    border-radius: ${e=>{let{borderRadius:t}=e;return t.round}} !important;
    overflow: hidden;
  }

  wui-loading-spinner {
    padding: ${e=>{let{spacing:t}=e;return t[1]}};
    background-color: ${e=>{let{tokens:t}=e;return t.core.foregroundAccent010}};
    border-radius: ${e=>{let{borderRadius:t}=e;return t.round}} !important;
  }
`;var ee=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};let te=class extends o.WF{constructor(){super(...arguments),this.message="",this.variant="success"}render(){return o.qy`
      ${this.templateIcon()}
      <wui-text variant="lg-regular" color="primary" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return"loading"===this.variant?o.qy`<wui-loading-spinner size="md" color="accent-primary"></wui-loading-spinner>`:o.qy`<wui-icon-box
      size="md"
      color=${{success:"success",error:"error",warning:"warning",info:"default"}[this.variant]}
      icon=${{success:"checkmark",error:"warning",warning:"warningCircle",info:"info"}[this.variant]}
    ></wui-icon-box>`}};te.styles=[f.W5,Q],ee([(0,i.MZ)()],te.prototype,"message",void 0),ee([(0,i.MZ)()],te.prototype,"variant",void 0),te=ee([(0,v.E)("wui-snackbar")],te);const re=o.AH`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`;var oe=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};let ie=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=g.P.state.open,this.unsubscribe.push(g.P.subscribeKey("open",e=>{this.open=e,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(e=>e())}render(){const{message:e,variant:t}=g.P.state;return o.qy` <wui-snackbar message=${e} variant=${t}></wui-snackbar> `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),g.P.state.autoClose&&(this.timeout=setTimeout(()=>g.P.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};ie.styles=re,oe([(0,i.wk)()],ie.prototype,"open",void 0),ie=oe([(0,y.EM)("w3m-snackbar")],ie);r(71996),r(61747);var ae=r(99199);r(59778),r(12904);const ne=y.AH`
  :host {
    z-index: ${e=>{let{tokens:t}=e;return t.core.zIndex}};
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: ${e=>{let{tokens:t}=e;return t.theme.overlay}};
    backdrop-filter: blur(0px);
    transition:
      opacity ${e=>{let{durations:t}=e;return t.lg}} ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}},
      backdrop-filter ${e=>{let{durations:t}=e;return t.lg}}
        ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
    backdrop-filter: blur(8px);
  }

  :host(.appkit-modal) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--apkt-modal-width);
    width: 100%;
    position: relative;
    outline: none;
    transform: translateY(4px);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.05);
    transition:
      transform ${e=>{let{durations:t}=e;return t.lg}}
        ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}},
      border-radius ${e=>{let{durations:t}=e;return t.lg}}
        ${e=>{let{easings:t}=e;return t["ease-out-power-1"]}},
      background-color ${e=>{let{durations:t}=e;return t.lg}}
        ${e=>{let{easings:t}=e;return t["ease-out-power-1"]}},
      box-shadow ${e=>{let{durations:t}=e;return t.lg}}
        ${e=>{let{easings:t}=e;return t["ease-out-power-1"]}};
    will-change: border-radius, background-color, transform, box-shadow;
    background-color: ${e=>{let{tokens:t}=e;return t.theme.backgroundPrimary}};
    padding: var(--local-modal-padding);
    box-sizing: border-box;
  }

  :host(.open) wui-card {
    transform: translateY(0px);
  }

  wui-card::before {
    z-index: 1;
    pointer-events: none;
    content: '';
    position: absolute;
    inset: 0;
    border-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    transition: box-shadow ${e=>{let{durations:t}=e;return t.lg}}
      ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
    transition-delay: ${e=>{let{durations:t}=e;return t.md}};
    will-change: box-shadow;
  }

  :host([data-mobile-fullscreen='true']) wui-card::before {
    border-radius: 0px;
  }

  :host([data-border='true']) wui-card::before {
    box-shadow: inset 0px 0px 0px 4px ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
  }

  :host([data-border='false']) wui-card::before {
    box-shadow: inset 0px 0px 0px 1px ${e=>{let{tokens:t}=e;return t.theme.borderPrimaryDark}};
  }

  :host([data-border='true']) wui-card {
    animation:
      fade-in ${e=>{let{durations:t}=e;return t.lg}} ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}},
      card-background-border var(--apkt-duration-dynamic)
        ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
    animation-fill-mode: backwards, both;
    animation-delay: var(--apkt-duration-dynamic);
  }

  :host([data-border='false']) wui-card {
    animation:
      fade-in ${e=>{let{durations:t}=e;return t.lg}} ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}},
      card-background-default var(--apkt-duration-dynamic)
        ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
    animation-fill-mode: backwards, both;
    animation-delay: 0s;
  }

  :host(.appkit-modal) wui-card {
    max-width: var(--apkt-modal-width);
  }

  wui-card[shake='true'] {
    animation:
      fade-in ${e=>{let{durations:t}=e;return t.lg}} ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}},
      w3m-shake ${e=>{let{durations:t}=e;return t.xl}}
        ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--apkt-spacing-6) 0px;
    }
  }

  @media (max-width: 430px) {
    :host([data-mobile-fullscreen='true']) {
      height: 100dvh;
    }
    :host([data-mobile-fullscreen='true']) wui-flex {
      align-items: stretch;
    }
    :host([data-mobile-fullscreen='true']) wui-card {
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      border: none;
    }
    :host(:not([data-mobile-fullscreen='true'])) wui-flex {
      align-items: flex-end;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card {
      max-width: 100%;
      border-bottom: none;
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card[data-embedded='true'] {
      border-bottom-left-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
      border-bottom-right-radius: clamp(0px, var(--apkt-borderRadius-8), 44px);
    }

    :host(:not([data-mobile-fullscreen='true'])) wui-card:not([data-embedded='true']) {
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
    }

    wui-card[shake='true'] {
      animation: w3m-shake 0.5s ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
    }
  }

  @keyframes fade-in {
    0% {
      transform: scale(0.99) translateY(4px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes card-background-border {
    from {
      background-color: ${e=>{let{tokens:t}=e;return t.theme.backgroundPrimary}};
    }
    to {
      background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
    }
  }

  @keyframes card-background-default {
    from {
      background-color: ${e=>{let{tokens:t}=e;return t.theme.foregroundSecondary}};
    }
    to {
      background-color: ${e=>{let{tokens:t}=e;return t.theme.backgroundPrimary}};
    }
  }
`;var se=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};const le="scroll-lock",ce={PayWithExchange:"0",PayWithExchangeSelectAsset:"0",Pay:"0",PayQuote:"0",PayLoading:"0"};class de extends o.WF{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=n.H.state.enableEmbedded,this.open=s.W.state.open,this.caipAddress=l.W.state.activeCaipAddress,this.caipNetwork=l.W.state.activeCaipNetwork,this.shake=s.W.state.shake,this.filterByNamespace=c.a.state.filterByNamespace,this.padding=y.f.spacing[1],this.mobileFullScreen=n.H.state.enableMobileFullScreen,this.initializeTheming(),d.N.prefetchAnalyticsConfig(),this.unsubscribe.push(s.W.subscribeKey("open",e=>e?this.onOpen():this.onClose()),s.W.subscribeKey("shake",e=>this.shake=e),l.W.subscribeKey("activeCaipNetwork",e=>this.onNewNetwork(e)),l.W.subscribeKey("activeCaipAddress",e=>this.onNewAddress(e)),n.H.subscribeKey("enableEmbedded",e=>this.enableEmbedded=e),c.a.subscribeKey("filterByNamespace",e=>{this.filterByNamespace===e||l.W.getAccountData(e)?.caipAddress||(d.N.fetchRecommendedWallets(),this.filterByNamespace=e)}),u.I.subscribeKey("view",()=>{this.dataset.border=ae.y.hasFooter()?"true":"false",this.padding=ce[u.I.state.view]??y.f.spacing[1]}))}firstUpdated(){if(this.dataset.border=ae.y.hasFooter()?"true":"false",this.mobileFullScreen&&this.setAttribute("data-mobile-fullscreen","true"),this.caipAddress){if(this.enableEmbedded)return s.W.close(),void this.prefetch();this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),this.onRemoveKeyboardListener()}render(){return this.style.setProperty("--local-modal-padding",this.padding),this.enableEmbedded?o.qy`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?o.qy`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return o.qy` <wui-card
      shake="${this.shake}"
      data-embedded="${(0,a.J)(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-footer></w3m-footer>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(e){if(e.target===e.currentTarget){if(this.mobileFullScreen)return;await this.handleClose()}}async handleClose(){await m.safeClose()}initializeTheming(){const{themeVariables:e,themeMode:t}=w.W.state,r=y.Zv.getColorTheme(t);(0,y.RF)(e,r)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),g.P.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const e=document.createElement("style");e.dataset.w3m=le,e.textContent="\n      body {\n        touch-action: none;\n        overflow: hidden;\n        overscroll-behavior: contain;\n      }\n      w3m-modal {\n        pointer-events: auto;\n      }\n    ",document.head.appendChild(e)}onScrollUnlock(){const e=document.head.querySelector(`style[data-w3m="${le}"]`);e&&e.remove()}onAddKeyboardListener(){this.abortController=new AbortController;const e=this.shadowRoot?.querySelector("wui-card");e?.focus(),window.addEventListener("keydown",t=>{if("Escape"===t.key)this.handleClose();else if("Tab"===t.key){const{tagName:r}=t.target;!r||r.includes("W3M-")||r.includes("WUI-")||e?.focus()}},this.abortController)}onRemoveKeyboardListener(){this.abortController?.abort(),this.abortController=void 0}async onNewAddress(e){const t=l.W.state.isSwitchingNamespace,r="ProfileWallets"===u.I.state.view;!e&&!t&&!r&&s.W.close(),await h.U.initializeIfEnabled(e),this.caipAddress=e,l.W.setIsSwitchingNamespace(!1)}onNewNetwork(e){const t=this.caipNetwork,r=t?.caipNetworkId?.toString(),o=e?.caipNetworkId?.toString(),i=r!==o,a="UnsupportedChain"===u.I.state.view,n=s.W.state.open;let l=!1;this.enableEmbedded&&"SwitchNetwork"===u.I.state.view&&(l=!0),i&&b.GN.resetState(),n&&a&&(l=!0),l&&"SIWXSignMessage"!==u.I.state.view&&u.I.goBack(),this.caipNetwork=e}prefetch(){this.hasPrefetched||(d.N.prefetch(),d.N.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}}de.styles=ne,se([(0,i.MZ)({type:Boolean})],de.prototype,"enableEmbedded",void 0),se([(0,i.wk)()],de.prototype,"open",void 0),se([(0,i.wk)()],de.prototype,"caipAddress",void 0),se([(0,i.wk)()],de.prototype,"caipNetwork",void 0),se([(0,i.wk)()],de.prototype,"shake",void 0),se([(0,i.wk)()],de.prototype,"filterByNamespace",void 0),se([(0,i.wk)()],de.prototype,"padding",void 0),se([(0,i.wk)()],de.prototype,"mobileFullScreen",void 0);let ue=class extends de{};ue=se([(0,y.EM)("w3m-modal")],ue);let pe=class extends de{};pe=se([(0,y.EM)("appkit-modal")],pe);r(92016),r(10477);const he=y.AH`
  .icon-box {
    width: 64px;
    height: 64px;
    border-radius: ${e=>{let{borderRadius:t}=e;return t[5]}};
    background-color: ${e=>{let{colors:t}=e;return t.semanticError010}};
  }
`;var me=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};let we=class extends o.WF{constructor(){super()}render(){return o.qy`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        gap="4"
        .padding="${["1","3","4","3"]}"
      >
        <wui-flex justifyContent="center" alignItems="center" class="icon-box">
          <wui-icon size="xxl" color="error" name="warningCircle"></wui-icon>
        </wui-flex>

        <wui-text variant="lg-medium" color="primary" align="center">
          The app isn't responding as expected
        </wui-text>
        <wui-text variant="md-regular" color="secondary" align="center">
          Try again or reach out to the app team for help.
        </wui-text>

        <wui-button
          variant="neutral-secondary"
          size="md"
          @click=${this.onTryAgainClick.bind(this)}
          data-testid="w3m-usage-exceeded-button"
        >
          <wui-icon color="inherit" slot="iconLeft" name="refresh"></wui-icon>
          Try Again
        </wui-button>
      </wui-flex>
    `}onTryAgainClick(){u.I.goBack()}};we.styles=he,we=me([(0,y.EM)("w3m-usage-exceeded-view")],we);var ge=r(38140);r(40115);const be=y.AH`
  :host {
    width: 100%;
  }
`;var ye=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};let fe=class extends o.WF{constructor(){super(...arguments),this.hasImpressionSent=!1,this.walletImages=[],this.imageSrc="",this.name="",this.size="md",this.tabIdx=void 0,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100",this.rdnsId="",this.displayIndex=void 0,this.walletRank=void 0,this.namespaces=[]}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback(),this.cleanupIntersectionObserver()}updated(e){super.updated(e),(e.has("name")||e.has("imageSrc")||e.has("walletRank"))&&(this.hasImpressionSent=!1);e.has("walletRank")&&this.walletRank&&!this.intersectionObserver&&this.setupIntersectionObserver()}setupIntersectionObserver(){this.intersectionObserver=new IntersectionObserver(e=>{e.forEach(e=>{!e.isIntersecting||this.loading||this.hasImpressionSent||this.sendImpressionEvent()})},{threshold:.1}),this.intersectionObserver.observe(this)}cleanupIntersectionObserver(){this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=void 0)}sendImpressionEvent(){this.name&&!this.hasImpressionSent&&this.walletRank&&(this.hasImpressionSent=!0,(this.rdnsId||this.name)&&D.E.sendWalletImpressionEvent({name:this.name,walletRank:this.walletRank,rdnsId:this.rdnsId,view:u.I.state.view,displayIndex:this.displayIndex}))}handleGetWalletNamespaces(){return Object.keys(ge.q.state.adapters).length>1?this.namespaces:[]}render(){return o.qy`
      <wui-list-wallet
        .walletImages=${this.walletImages}
        imageSrc=${(0,a.J)(this.imageSrc)}
        name=${this.name}
        size=${(0,a.J)(this.size)}
        tagLabel=${(0,a.J)(this.tagLabel)}
        .tagVariant=${this.tagVariant}
        .walletIcon=${this.walletIcon}
        .tabIdx=${this.tabIdx}
        .disabled=${this.disabled}
        .showAllWallets=${this.showAllWallets}
        .loading=${this.loading}
        loadingSpinnerColor=${this.loadingSpinnerColor}
        .namespaces=${this.handleGetWalletNamespaces()}
      ></wui-list-wallet>
    `}};fe.styles=be,ye([(0,i.MZ)({type:Array})],fe.prototype,"walletImages",void 0),ye([(0,i.MZ)()],fe.prototype,"imageSrc",void 0),ye([(0,i.MZ)()],fe.prototype,"name",void 0),ye([(0,i.MZ)()],fe.prototype,"size",void 0),ye([(0,i.MZ)()],fe.prototype,"tagLabel",void 0),ye([(0,i.MZ)()],fe.prototype,"tagVariant",void 0),ye([(0,i.MZ)()],fe.prototype,"walletIcon",void 0),ye([(0,i.MZ)()],fe.prototype,"tabIdx",void 0),ye([(0,i.MZ)({type:Boolean})],fe.prototype,"disabled",void 0),ye([(0,i.MZ)({type:Boolean})],fe.prototype,"showAllWallets",void 0),ye([(0,i.MZ)({type:Boolean})],fe.prototype,"loading",void 0),ye([(0,i.MZ)({type:String})],fe.prototype,"loadingSpinnerColor",void 0),ye([(0,i.MZ)()],fe.prototype,"rdnsId",void 0),ye([(0,i.MZ)()],fe.prototype,"displayIndex",void 0),ye([(0,i.MZ)()],fe.prototype,"walletRank",void 0),ye([(0,i.MZ)({type:Array})],fe.prototype,"namespaces",void 0),fe=ye([(0,y.EM)("w3m-list-wallet")],fe);const ve=y.AH`
  :host {
    --local-duration-height: 0s;
    --local-duration: ${e=>{let{durations:t}=e;return t.lg}};
    --local-transition: ${e=>{let{easings:t}=e;return t["ease-out-power-2"]}};
  }

  .container {
    display: block;
    overflow: hidden;
    overflow: hidden;
    position: relative;
    height: var(--local-container-height);
    transition: height var(--local-duration-height) var(--local-transition);
    will-change: height, padding-bottom;
  }

  .container[data-mobile-fullscreen='true'] {
    overflow: scroll;
  }

  .page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: auto;
    width: inherit;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: ${e=>{let{tokens:t}=e;return t.theme.backgroundPrimary}};
    border-bottom-left-radius: var(--local-border-bottom-radius);
    border-bottom-right-radius: var(--local-border-bottom-radius);
    transition: border-bottom-left-radius var(--local-duration) var(--local-transition);
  }

  .page[data-mobile-fullscreen='true'] {
    height: 100%;
  }

  .page-content {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .footer {
    height: var(--apkt-footer-height);
  }

  div.page[view-direction^='prev-'] .page-content {
    animation:
      slide-left-out var(--local-duration) forwards var(--local-transition),
      slide-left-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${e=>{let{durations:t}=e;return t.lg}});
  }

  div.page[view-direction^='next-'] .page-content {
    animation:
      slide-right-out var(--local-duration) forwards var(--local-transition),
      slide-right-in var(--local-duration) forwards var(--local-transition);
    animation-delay: 0ms, var(--local-duration, ${e=>{let{durations:t}=e;return t.lg}});
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
    to {
      transform: translateX(-8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(8px) scale(0.99);
      opacity: 0;
      filter: blur(4px);
    }
    to {
      transform: translateX(0) translateY(0) scale(1);
      opacity: 1;
      filter: blur(0px);
    }
  }
`;var ke=function(e,t,r,o){var i,a=arguments.length,n=a<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,r):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)n=Reflect.decorate(e,t,r,o);else for(var s=e.length-1;s>=0;s--)(i=e[s])&&(n=(a<3?i(n):a>3?i(t,r,n):i(t,r))||n);return a>3&&n&&Object.defineProperty(t,r,n),n};let xe=class extends o.WF{constructor(){super(...arguments),this.resizeObserver=void 0,this.transitionDuration="0.15s",this.transitionFunction="",this.history="",this.view="",this.setView=void 0,this.viewDirection="",this.historyState="",this.previousHeight="0px",this.mobileFullScreen=n.H.state.enableMobileFullScreen,this.onViewportResize=()=>{this.updateContainerHeight()}}updated(e){if(e.has("history")){const e=this.history;""!==this.historyState&&this.historyState!==e&&this.onViewChange(e)}e.has("transitionDuration")&&this.style.setProperty("--local-duration",this.transitionDuration),e.has("transitionFunction")&&this.style.setProperty("--local-transition",this.transitionFunction)}firstUpdated(){this.transitionFunction&&this.style.setProperty("--local-transition",this.transitionFunction),this.style.setProperty("--local-duration",this.transitionDuration),this.historyState=this.history,this.resizeObserver=new ResizeObserver(e=>{for(const t of e)if(t.target===this.getWrapper()){let e=t.contentRect.height;const r=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0");if(this.mobileFullScreen){e=(window.visualViewport?.height||window.innerHeight)-this.getHeaderHeight()-r,this.style.setProperty("--local-border-bottom-radius","0px")}else{e=e+r,this.style.setProperty("--local-border-bottom-radius",r?"var(--apkt-borderRadius-5)":"0px")}this.style.setProperty("--local-container-height",`${e}px`),"0px"!==this.previousHeight&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${e}px`}}),this.resizeObserver.observe(this.getWrapper()),this.updateContainerHeight(),window.addEventListener("resize",this.onViewportResize),window.visualViewport?.addEventListener("resize",this.onViewportResize)}disconnectedCallback(){const e=this.getWrapper();e&&this.resizeObserver&&this.resizeObserver.unobserve(e),window.removeEventListener("resize",this.onViewportResize),window.visualViewport?.removeEventListener("resize",this.onViewportResize)}render(){return o.qy`
      <div class="container" data-mobile-fullscreen="${(0,a.J)(this.mobileFullScreen)}">
        <div
          class="page"
          data-mobile-fullscreen="${(0,a.J)(this.mobileFullScreen)}"
          view-direction="${this.viewDirection}"
        >
          <div class="page-content">
            <slot></slot>
          </div>
        </div>
      </div>
    `}onViewChange(e){const t=e.split(",").filter(Boolean),r=this.historyState.split(",").filter(Boolean),o=r.length,i=t.length,a=t[t.length-1]||"",n=y.Zv.cssDurationToNumber(this.transitionDuration);let s="";i>o?s="next":i<o?s="prev":i===o&&t[i-1]!==r[o-1]&&(s="next"),queueMicrotask(()=>{this.viewDirection=`${s}-${a}`}),setTimeout(()=>{this.historyState=e,this.setView?.(a)},n),setTimeout(()=>{this.viewDirection=""},2*n)}getWrapper(){return this.shadowRoot?.querySelector("div.page")}updateContainerHeight(){const e=this.getWrapper();if(!e)return;const t=parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--apkt-footer-height")||"0");let r=0;if(this.mobileFullScreen){r=(window.visualViewport?.height||window.innerHeight)-this.getHeaderHeight()-t,this.style.setProperty("--local-border-bottom-radius","0px")}else r=e.getBoundingClientRect().height+t,this.style.setProperty("--local-border-bottom-radius",t?"var(--apkt-borderRadius-5)":"0px");this.style.setProperty("--local-container-height",`${r}px`),"0px"!==this.previousHeight&&this.style.setProperty("--local-duration-height",this.transitionDuration),this.previousHeight=`${r}px`}getHeaderHeight(){return 60}};xe.styles=[ve],ke([(0,i.MZ)({type:String})],xe.prototype,"transitionDuration",void 0),ke([(0,i.MZ)({type:String})],xe.prototype,"transitionFunction",void 0),ke([(0,i.MZ)({type:String})],xe.prototype,"history",void 0),ke([(0,i.MZ)({type:String})],xe.prototype,"view",void 0),ke([(0,i.MZ)({attribute:!1})],xe.prototype,"setView",void 0),ke([(0,i.wk)()],xe.prototype,"viewDirection",void 0),ke([(0,i.wk)()],xe.prototype,"historyState",void 0),ke([(0,i.wk)()],xe.prototype,"previousHeight",void 0),ke([(0,i.wk)()],xe.prototype,"mobileFullScreen",void 0),xe=ke([(0,y.EM)("w3m-router-container")],xe)}}]);
//# sourceMappingURL=9520.9f3decd8.chunk.js.map