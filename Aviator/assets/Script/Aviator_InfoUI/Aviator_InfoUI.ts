// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Aviator_DatCuoc from "../Aviator_GameplayUI/Aviator_DatCuoc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Aviator_InfoUI extends cc.Component {

    public static Instance: Aviator_InfoUI = null;

    @property(cc.Label)
    private moneyCashOutLabel: cc.Label = null;

    @property(cc.Label)
    private currentMoneyLabel: cc.Label = null;

    protected onLoad(): void {
        Aviator_InfoUI.Instance = this;
    }

    protected start(): void {
        this.SetMoneyCashOutState(false);
    }

    public SetCurrentMoneyLabel(value: number){
        this.currentMoneyLabel.string = "" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    public SetMoneyCashOutLabel(value: number){
        this.moneyCashOutLabel.string = "+" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    public SetMoneyCashOutState(state: boolean){
        this.moneyCashOutLabel.node.active = state;

        if(state){    
            this.scheduleOnce(() => {
                this.SetMoneyCashOutState(false);
            }, 2);
        }
    }
}
