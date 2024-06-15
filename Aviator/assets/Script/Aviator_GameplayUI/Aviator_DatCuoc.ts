// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Aviator_GameManager from "../Manager/Aviator_GameManager";
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

    private isBetting: boolean = false;
    private isCashingOut: boolean = false;
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

    @property(cc.Button)
    private betButton: cc.Button = null;

    @property([cc.Button])
    private capDoCuocList: cc.Button[] = [];

    @property(cc.Label)
    private betLabel: cc.Label = null;

    @property(cc.Label)
    private betLevelLabel: cc.Label = null;

    @property(cc.Color)
    private betColor: cc.Color = cc.Color.WHITE;

    @property(cc.Color)
    private cancelColor: cc.Color = cc.Color.WHITE;

    @property(cc.Color)
    private cashOutColor: cc.Color = cc.Color.WHITE;


    protected onLoad(): void {
        this.betModeButton.node.on('click', this.OnBetModeButtonClick, this);
        this.subButton.node.on('click', this.OnSubButtonClick, this);
        this.sumButton.node.on('click', this.OnSumButtonClick, this);

        this.betButton.node.on("click", this.OnBetClick, this);
    }

    protected start(): void {
        this.Init();
    }
    
    Init(){
        this.SetBetLevel(Aviator_GameManager.Instance.GetMinBet());    
    }

    OnBetClick(){
        if(this.IsCashOut()){
            this.HandleCashOut();
            return;
        }

        this.isBetting = !this.isBetting;
        this.SetBetButtonState(this.isBetting);
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




    public HandleCashOut(){
        Aviator_GameManager.Instance.HandleCashOut(this.moneyCanCashOut);

        this.SwitchToBetButton();
    }

    public SwitchToCashOutButton(){
        this.SetBetLabel("Cash Out");

        this.SetBetLevelState(true); 
        this.SetIsCashingOut(true);

        this.betButton.node.color = this.cashOutColor;

    }

    public SwitchToBetButton(){

        this.SetBetLevelLabel(this.betLevel);
        this.SetIsCashingOut(false);
        this.SetBetButtonState(false);

    }

    private SetBetButtonState(state: boolean){

        this.isBetting = state;
        if(this.isBetting){
            this.betButton.node.color = this.cancelColor;
            this.SetBetLevelState(false);
            this.SetBetLabel("Cancel");

            this.HandleStartBet();
        }
        else{
            this.betButton.node.color = this.betColor;
            this.SetBetLevelState(true);
            this.SetBetLabel("Bet");

            this.HandleEndBet();
        }
    }

    private SetBetLevelState (state: boolean){
        this.betLevelLabel.node.active = state;
    }

    private SetBetLabel(text: string){
        this.betLabel.string = text;
    }

    public SetBetLevelLabel(value: number){
        this.betLevelLabel.string = Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    public SetIsCashingOut(state: boolean){
        this.isCashingOut = state;
    }

    public SetMoneyCanCashOut(value: number){
        if(!this.IsCashOut()) return;

        this.moneyCanCashOut = value * this.betLevel;
        this.moneyCanCashOut = Math.floor(this.moneyCanCashOut);

        this.SetBetLevelLabel(this.moneyCanCashOut);
    }

    public IsBetting(): boolean{
        return this.isBetting;
    }

    public IsCashOut(): boolean{
        return this.isCashingOut;
    }

    public GetMoneyCanCashOut(): number{
        return this.moneyCanCashOut;
    }

    public GetBetButton(){
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
        this.SetBetLevelLabel(this.betLevel);
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

    public HandleStartBet(){
        this.subButton.interactable = false;
        this.sumButton.interactable = false;

        this.betModeButton.interactable = false;

        this.capDoCuocList.forEach(capDoCuoc => {
            capDoCuoc.interactable = false;     
        });

    }

    public HandleEndBet(){

        this.subButton.interactable = true;
        this.sumButton.interactable = true;

        this.betModeButton.interactable = true;

        this.capDoCuocList.forEach(capDoCuoc => {
            capDoCuoc.interactable = true;     
        });

    }
}
