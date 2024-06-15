// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Aviator_GameplayUI from "./Aviator_GameplayUI";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Aviator_MyBet extends cc.Component {
    @property(cc.Label)
    private dateLable: cc.Label = null;

    @property(cc.Label)
    private betVNDLabel: cc.Label = null;

    @property(cc.Label)
    private xCostLabel: cc.Label = null;

    @property(cc.Label)
    private cashOutVNDLabel: cc.Label = null;

    protected GetCurrentHour(){
        //định dạng hh:mm
        var date = new Date();
        var hour = date.getHours();
        var minute = date.getMinutes();

        return hour + ":" + minute;

    }

    protected onLoad(): void {
        this.SetDateLabel();
        this.SetBetVNDLabel(100000);
        this.SetXCostLabel(10.38);
        this.SetCashOutVNDLabel(200000);
    }

    public SetDateLabel(){
        this.dateLable.string = this.GetCurrentHour();
    }

    public SetBetVNDLabel(value: number){
        this.betVNDLabel.string = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    public SetXCostLabel(value: number){
        this.xCostLabel.string = value.toString() + "x";
    }

    public SetCashOutVNDLabel(value: number){
        this.cashOutVNDLabel.string = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}
