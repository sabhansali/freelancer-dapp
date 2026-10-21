"use strict";(globalThis.webpackChunkfreelancer_dapp_frontend||=[]).push([[6556],{26556(e,t,i){i.r(t),i.d(t,{W3mWalletReceiveView:()=>x});var o=i(37022),r=i(56370),n=i(56440),s=i(17321),a=i(7258),c=i(1348),l=i(36141),d=i(60205),u=i(61139),w=i(24657),p=i(89268),h=(i(18820),i(71056),i(7836),i(52574),i(39446)),m=i(37845);const f=i(89406).AH`
  button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: ${({spacing:e})=>e[4]};
    background-color: ${({tokens:e})=>e.theme.foregroundPrimary};
    border-radius: ${({borderRadius:e})=>e[3]};
    border: none;
    padding: ${({spacing:e})=>e[3]};
    transition: background-color ${({durations:e})=>e.lg}
      ${({easings:e})=>e["ease-out-power-2"]};
    will-change: background-color;
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  button:hover:enabled,
  button:active:enabled {
    background-color: ${({tokens:e})=>e.theme.foregroundSecondary};
  }

  wui-text {
    flex: 1;
    color: ${({tokens:e})=>e.theme.textSecondary};
  }

  wui-flex {
    width: auto;
    display: flex;
    align-items: center;
    gap: ${({spacing:e})=>e["01"]};
  }

  wui-icon {
    color: ${({tokens:e})=>e.theme.iconDefault};
  }

  .network-icon {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: ${({borderRadius:e})=>e[4]};
    overflow: hidden;
    margin-left: -8px;
  }

  .network-icon:first-child {
    margin-left: 0px;
  }

  .network-icon:after {
    position: absolute;
    inset: 0;
    content: '';
    display: block;
    height: 100%;
    width: 100%;
    border-radius: ${({borderRadius:e})=>e[4]};
    box-shadow: inset 0 0 0 1px ${({tokens:e})=>e.core.glass010};
  }
`;var g=function(e,t,i,o){var r,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(s=(n<3?r(s):n>3?r(t,i,s):r(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};let k=class extends o.WF{constructor(){super(...arguments),this.networkImages=[""],this.text=""}render(){return o.qy`
      <button>
        <wui-text variant="md-regular" color="inherit">${this.text}</wui-text>
        <wui-flex>
          ${this.networksTemplate()}
          <wui-icon name="chevronRight" size="sm" color="inherit"></wui-icon>
        </wui-flex>
      </button>
    `}networksTemplate(){const e=this.networkImages.slice(0,5);return o.qy` <wui-flex class="networks">
      ${e?.map(e=>o.qy` <wui-flex class="network-icon"> <wui-image src=${e}></wui-image> </wui-flex>`)}
    </wui-flex>`}};k.styles=[h.W5,h.fD,f],g([(0,r.MZ)({type:Array})],k.prototype,"networkImages",void 0),g([(0,r.MZ)()],k.prototype,"text",void 0),k=g([(0,m.E)("wui-compatible-network")],k);i(84107),i(75938),i(84875);var b=i(59979);const y=p.AH`
  wui-compatible-network {
    margin-top: ${({spacing:e})=>e[4]};
    width: 100%;
  }

  wui-qr-code {
    width: unset !important;
    height: unset !important;
  }

  wui-icon {
    align-items: normal;
  }
`;var v=function(e,t,i,o){var r,n=arguments.length,s=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)s=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(s=(n<3?r(s):n>3?r(t,i,s):r(t,i))||s);return n>3&&s&&Object.defineProperty(t,i,s),s};let x=class extends o.WF{constructor(){super(),this.unsubscribe=[],this.address=s.W.getAccountData()?.address,this.profileName=s.W.getAccountData()?.profileName,this.network=s.W.state.activeCaipNetwork,this.unsubscribe.push(s.W.subscribeChainProp("accountState",e=>{e?(this.address=e.address,this.profileName=e.profileName):a.P.showError("Account not found")}),s.W.subscribeKey("activeCaipNetwork",e=>{e?.id&&(this.network=e)}))}disconnectedCallback(){this.unsubscribe.forEach(e=>e())}render(){if(!this.address)throw new Error("w3m-wallet-receive-view: No account provided");const e=c.$.getNetworkImage(this.network);return o.qy` <wui-flex
      flexDirection="column"
      .padding=${["0","4","4","4"]}
      alignItems="center"
    >
      <wui-chip-button
        data-testid="receive-address-copy-button"
        @click=${this.onCopyClick.bind(this)}
        text=${p.Zv.getTruncateString({string:this.profileName||this.address||"",charsStart:this.profileName?18:4,charsEnd:this.profileName?0:4,truncate:this.profileName?"end":"middle"})}
        icon="copy"
        size="sm"
        imageSrc=${e||""}
        variant="gray"
      ></wui-chip-button>
      <wui-flex
        flexDirection="column"
        .padding=${["4","0","0","0"]}
        alignItems="center"
        gap="4"
      >
        <wui-qr-code
          size=${232}
          theme=${l.W.state.themeMode}
          uri=${this.address}
          ?arenaClear=${!0}
          color=${(0,n.J)(l.W.state.themeVariables["--apkt-qr-color"]??l.W.state.themeVariables["--w3m-qr-color"])}
          data-testid="wui-qr-code"
        ></wui-qr-code>
        <wui-text variant="lg-regular" color="primary" align="center">
          Copy your address or scan this QR code
        </wui-text>
        <wui-button @click=${this.onCopyClick.bind(this)} size="sm" variant="neutral-secondary">
          <wui-icon slot="iconLeft" size="sm" color="inherit" name="copy"></wui-icon>
          <wui-text variant="md-regular" color="inherit">Copy address</wui-text>
        </wui-button>
      </wui-flex>
      ${this.networkTemplate()}
    </wui-flex>`}networkTemplate(){const e=s.W.getAllRequestedCaipNetworks(),t=s.W.checkIfSmartAccountEnabled(),i=s.W.state.activeCaipNetwork,r=e.filter(e=>e?.chainNamespace===i?.chainNamespace);if((0,d.lj)(i?.chainNamespace)===b.Vl.ACCOUNT_TYPES.SMART_ACCOUNT&&t)return i?o.qy`<wui-compatible-network
        @click=${this.onReceiveClick.bind(this)}
        text="Only receive assets on this network"
        .networkImages=${[c.$.getNetworkImage(i)??""]}
      ></wui-compatible-network>`:null;const n=r?.filter(e=>e?.assets?.imageId)?.slice(0,5),a=n.map(c.$.getNetworkImage).filter(Boolean);return o.qy`<wui-compatible-network
      @click=${this.onReceiveClick.bind(this)}
      text="Only receive assets on these networks"
      .networkImages=${a}
    ></wui-compatible-network>`}onReceiveClick(){u.I.push("WalletCompatibleNetworks")}onCopyClick(){try{this.address&&(w.w.copyToClopboard(this.address),a.P.showSuccess("Address copied"))}catch{a.P.showError("Failed to copy")}}};x.styles=y,v([(0,r.wk)()],x.prototype,"address",void 0),v([(0,r.wk)()],x.prototype,"profileName",void 0),v([(0,r.wk)()],x.prototype,"network",void 0),x=v([(0,p.EM)("w3m-wallet-receive-view")],x)}}]);
//# sourceMappingURL=6556.68cc5381.chunk.js.map