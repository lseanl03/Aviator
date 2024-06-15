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
export default class Aviator_NhomDatCuoc extends cc.Component {

    @property(Aviator_DatCuoc)
    public datCuoc1: Aviator_DatCuoc = null;

    // @property(Aviator_DatCuoc)
    // public datCuoc2: Aviator_DatCuoc = null;

    protected onLoad(): void {

        this.datCuoc1.switchBetBoxButton.node.on("click", this.OnSwitchBetBox1ButtonClicked, this);
        //this.betBox2.switchBetBoxButton.node.on("click", this.OnSwitchBetBox2ButtonClicked, this);
    }

    public SetCashOutStateBetBox(){
        if(this.datCuoc1.node.active){
            if(this.datCuoc1.GetBetButton().IsBetting()){
                this.datCuoc1.GetBetButton().SwitchToCashOutButton();
            }
        }
    }

    public HandleStartBet(){
        if(this.datCuoc1.node.active && this.datCuoc1.GetBetButton().IsBetting()){
            this.datCuoc1.GetBetButton().SwitchToCashOutButton();
            Aviator_GameManager.Instance.BetMoney(this.datCuoc1.GetBetLevel());
        }
    }

    private OnSwitchBetBox1ButtonClicked(){
        this.SetBetBox2State(true); 
    }

    private OnSwitchBetBox2ButtonClicked(){
        this.SetBetBox2State(false);
    }

    private SetBetBox2State(state : boolean){
        //this.betBox2.node.active = state;

        //this.betBox1.SetSwitchBetBoxButtonState(!state);
    }

    public GetDatCuoc1(){
        return this.datCuoc1;
    }

    public GetDatCuoc2(){
    }
}
