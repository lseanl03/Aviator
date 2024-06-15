// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Aviator_GameManager from "../Manager/Aviator_GameManager";
import Aviator_BetButton from "./Aviator_BetButton";
import Aviator_CapDoCuoc from "./Aviator_CapDoCuoc";
import Aviator_GameUI from "./Aviator_GameUI";
import Aviator_GameplayUI from "./Aviator_GameplayUI";

const {ccclass, property} = cc._decorator;
export enum BetBoxType{
    BetBox1 = 1,
    BetBox2 = 2,
}
@ccclass
export default class Aviator_DatCuoc extends cc.Component {

    private isAutoBetMode: boolean = false;
    private betLevel: number = 0;
    private moneyCanCashOut: number = 0;


    @property({type: cc.Enum(BetBoxType)})
    private betBoxType: BetBoxType = BetBoxType.BetBox1;

    @property(cc.Button)
    private betModeButton: cc.Button = null;

    @property(cc.Node)
    private handle: cc.Node = null;

    @property(cc.Button)
    public switchBetBoxButton: cc.Button = null;
    
    @property(cc.Button)
    private subButton: cc.Button = null;

    @property(cc.Button)
    private sumButton: cc.Button = null;

    @property(cc.Label)
    private betLevelViewLabel: cc.Label = null;

    @property(Aviator_BetButton)
    private betButton: Aviator_BetButton = null;

    @property([cc.Button])
    private capDoCuocList: cc.Button[] = [];


    protected onLoad(): void {
        this.betModeButton.node.on('click', this.OnBetModeButtonClick, this);
        this.subButton.node.on('click', this.OnSubButtonClick, this);
        this.sumButton.node.on('click', this.OnSumButtonClick, this);
    }

    protected start(): void {
        this.Init();
    }
    
    Init(){
        this.SetBetLevel(Aviator_GameManager.Instance.GetMinBet());    
    }

    OnSubButtonClick(){
        this.SetBetLevel(this.betLevel - Aviator_GameManager.Instance.GetMinBet());
    }

    OnSumButtonClick(){
        this.SetBetLevel(this.betLevel + Aviator_GameManager.Instance.GetMinBet());
    }

    OnBetModeButtonClick(): void {
        this.isAutoBetMode = !this.isAutoBetMode;
        this.HanldeMode(this.isAutoBetMode);
    }

    public SetMoneyCanCashOut(value: number){
        this.moneyCanCashOut = value * this.betLevel;
        this.betButton.SetBetLevelLabel(this.moneyCanCashOut);
    }

    public GetMoneyCanCashOut(): number{
        return this.moneyCanCashOut;
    }

    public GetBetButton(): Aviator_BetButton{
        return this.betButton;
    }

    public GetBetLevel(): number{
        return this.betLevel;
    }
    public SetBetLevel(value: number){
        this.betLevel = value;

        if(this.betLevel < Aviator_GameManager.Instance.GetMinBet()) 
            this.betLevel = Aviator_GameManager.Instance.GetMinBet();
        if(this.betLevel > Aviator_GameManager.Instance.GetMaxBet())
            this.betLevel = Aviator_GameManager.Instance.GetMaxBet();

        this.SetBetLevelView(this.betLevel);
        this.betButton.SetBetLevelLabel(this.betLevel);
    }

    public SetSwitchBetBoxButtonState(state: boolean){
        this.switchBetBoxButton.node.active = state;
    }

    private SetBetLevelView(value: number){
        this.betLevelViewLabel.string = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }


    private HanldeButtonEffect(posX : number){
        cc.tween(this.handle)
        .to(0.1,{ position: cc.v3(posX,this.handle.position.y, this.handle.position.z) })
        .start();
    }

    private HanldeMode(state : boolean){
        if(state){
            this.HanldeButtonEffect(25);
        }
        else{
            this.HanldeButtonEffect(-25);
        }
    }

    public HandleStartRound(){
        this.subButton.interactable = false;
        this.sumButton.interactable = false;

        this.betModeButton.interactable = false;

        this.capDoCuocList.forEach(capDoCuoc => {
            capDoCuoc.interactable = false;     
        });

    }

    public HandleEndRound(){

        this.subButton.interactable = true;
        this.sumButton.interactable = true;

        this.betModeButton.interactable = true;

        this.capDoCuocList.forEach(capDoCuoc => {
            capDoCuoc.interactable = true;     
        });

    }
}
