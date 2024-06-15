// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Aviator_DatCuoc from "../Aviator_GameplayUI/Aviator_DatCuoc";
import Aviator_GameplayUI from "../Aviator_GameplayUI/Aviator_GameplayUI";
import Aviator_NhomDatCuoc from "../Aviator_GameplayUI/Aviator_NhomDatCuoc";
import Aviator_InfoUI from "../Aviator_InfoUI/Aviator_InfoUI";

const {ccclass, property} = cc._decorator;
const Random = (min, max) => {
    return Math.random() * (max - min) + min
}

@ccclass
export default class Aviator_GameManager extends cc.Component {

    public static Instance: Aviator_GameManager = null;

    @property(cc.Color)
    private colorLess2x: cc.Color = cc.Color.WHITE;

    @property(cc.Color)
    private colorLess10x: cc.Color = cc.Color.WHITE;

    @property(cc.Color)
    private colorMore10x: cc.Color = cc.Color.WHITE;

    private isWaittingRound: boolean = false;
    private isEndRound: boolean = false;

    private currentMoney: number = 0;

    private delayTime: number = 0.1;
    private xCost: number = 1;
    private duration: number = 2;
    private stopTime: number = 0;

    private totalRate: number = 0;
    private x1Rate: number = 40;
    private x2Rate: number = 55;
    private x10Rate: number = 5;

    private minBet: number = 10000;
    private maxBet: number = 1000000;

    private waittingRoundTime: number = 5;

    @property(Aviator_NhomDatCuoc)
    private nhomDatCuoc: Aviator_NhomDatCuoc = null;

    protected onLoad() {
        Aviator_GameManager.Instance = this;
    }
        
    protected start(): void {
        this.Init();
    }

    Init(){
        this.SetCurrentMoney(1000000);
        this.RandomStopTime();

        this.SetIsWaittingRound(true);
        this.SetIsEndRound(true);
    }

    protected update(dt: number): void {
        
        if(this.isWaittingRound && this.isEndRound){ 
            this.SetIsEndRound(false);

            this.StartWaittingRound(); 
        }
        else if(!this.isWaittingRound && !this.isEndRound){
            
            this.StartRound(dt);
        }
    }


    //Get Set

    public SetIsWaittingRound(state: boolean): void {
        this.isWaittingRound = state;

        if(!state){
            this.HandleStartRound();
        }
    }

    public SetIsEndRound(state: boolean): void {
        this.isEndRound = state;
    }

    public GetWaittingRoundTime(): number {
        return this.waittingRoundTime;
    }

    public SetCurrentMoney(value: number): void {
        this.currentMoney = value;
        this.currentMoney = Math.floor(this.currentMoney);

        Aviator_InfoUI.Instance.SetCurrentMoneyLabel(this.currentMoney);
    }
    
    private SetDuration(value: number): void {
        this.duration = parseFloat(value.toFixed(5)); 
    }

    public GetCurrentMoney(): number {
        return this.currentMoney;
    }
    public GetMinBet(): number {
        return this.minBet;
    }
    public GetMaxBet(): number {
        return this.maxBet;
    }
    public GetXCost(): number {
        return this.xCost;
    }




    //Function

    public HandleCashOut(moneyCashOut : number){
        this.SetCurrentMoney(this.currentMoney + moneyCashOut);

        Aviator_InfoUI.Instance.SetMoneyCashOutState(true);
        Aviator_InfoUI.Instance.SetMoneyCashOutLabel(moneyCashOut);
    }

    private HandleStartRound(){
        this.nhomDatCuoc.HandleStartBet();
        Aviator_GameplayUI.Instance.HandleStartRound();
    }

    public BetMoney(betLevel: number){
        this.SetCurrentMoney(this.currentMoney - betLevel);
    }

    public StartWaittingRound(){
        Aviator_GameplayUI.Instance.HandleWaittingRound();
    }

    public StartRound(dt : number){

        this.stopTime -= dt;
        if(this.stopTime > 0){
            this.delayTime -= dt;
            if(this.delayTime <= 0){
                this.delayTime = 0.1;
                this.xCost += dt/ this.duration; 
                this.xCost = parseFloat(this.xCost.toFixed(5));
                this.SetDuration(2/this.xCost);
    
                Aviator_GameplayUI.Instance.bettingGroup.SetXCostLabel(this.xCost);
                Aviator_GameplayUI.Instance.nhomDatCuoc.GetDatCuoc1().SetMoneyCanCashOut(this.xCost);
            }
        }
        else{
            cc.log("End Round");
            this.SetIsEndRound(true);
            this.HandleEndRound();
        }
    }

    private HandleEndRound(){

        if(this.nhomDatCuoc.GetDatCuoc1().IsCashOut()){
            this.nhomDatCuoc.GetDatCuoc1().SwitchToBetButton();
        }
        
        Aviator_GameplayUI.Instance.HandleEndRound();

        this.scheduleOnce(() => {
            this.ResetRound();

            this.SetIsWaittingRound(true);
        }, 2);
    }

    private RandomStopTime() {

        let random = Math.random() * 100;

        cc.log("Random: " + random);

        this.totalRate += this.x1Rate;

        if(random <= this.totalRate){
            this.stopTime = Random(0, 1);
        }
        else{
            this.totalRate += this.x2Rate;
            if(random <= this.totalRate){
                this.stopTime = Random(1, 10);
            }
            else{
                this.totalRate += this.x10Rate;
                if(random <= this.totalRate){
                    this.stopTime = Random(10, 100);
                }
            }
        }
        this.stopTime = parseFloat(this.stopTime.toFixed(2));
        cc.log("Stop Time: " + this.stopTime);
    }

    private ResetRound(){
        this.xCost = 1;
        this.totalRate = 0;
        this.SetDuration(2);
        this.RandomStopTime();
    }

    // public CanBet(betLevel: number){
    //     if(this.currentMoney >= betLevel && (this.isEndRound || this.isWaittingRound)){
    //         cc.log("Can Bet");
    //     }
    // }
}
