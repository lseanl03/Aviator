// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Aviator_GameManager from "../Manager/Aviator_GameManager";
import Aviator_DatCuoc from "./Aviator_DatCuoc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Aviator_BetButton extends cc.Component {

    private isBetting: boolean = false;
    private isCashingOut: boolean = false;

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
        this.node.on("click", this.OnBetClick, this);

    }

    OnBetClick(){
        this.isBetting = !this.isBetting;
        this.SetBetButtonState(this.isBetting);
    }


    public SetIsCashingOut(state: boolean){
        this.isCashingOut = state;
    }

    private SetBetButtonState(state: boolean){

        this.isBetting = state;
        if(this.isBetting){
            this.node.color = this.cancelColor;
            this.SetBetLevelState(false);
            this.SetBetLabel("Cancel");
        }
        else{
            this.node.color = this.betColor;
            this.SetBetLevelState(true);
            this.SetBetLabel("Bet");
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

    public SwitchToCashOutButton(){
        this.SetBetLabel("Cash Out");
        this.SetBetLevelState(true); 
        this.SetIsCashingOut(true);
        
        this.node.color = this.cashOutColor;
    }

    public SwitchToBetButton(){
        this.SetBetLabel("Bet");

        this.SetIsCashingOut(false);

        this.node.color = this.betColor;
    }

    public IsBetting(): boolean{
        return this.isBetting;
    }

    public IsCashOut(): boolean{
        return this.isCashingOut;
    }
}
