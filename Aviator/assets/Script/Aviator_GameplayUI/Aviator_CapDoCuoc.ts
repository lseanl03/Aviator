// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import ButtonBase from "../ButtonBase";
import Aviator_GameManager from "../Manager/Aviator_GameManager";
import Aviator_DatCuoc from "./Aviator_DatCuoc";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Aviator_CapDoCuoc extends ButtonBase {
   
    @property
    private cost: number = 0;

    @property(cc.Label)
    private costLabel: cc.Label = null;

    @property(Aviator_DatCuoc)
    private datCuoc: Aviator_DatCuoc = null;

    protected onLoad(): void {

        super.onLoad();

        this.node.on('click', this.OnButtonClick, this);
    }

    protected start(): void {
        this.SetCostLabel();
    }

    OnButtonClick(){
        if(this.datCuoc == null) return;

        if(this.datCuoc.GetBetLevel() == Aviator_GameManager.Instance.GetMaxBet()){
            this.datCuoc.SetBetLevel(this.cost);
            return;
        }
        this.datCuoc.SetBetLevel(this.datCuoc.GetBetLevel() + this.cost);
    }

    private SetCostLabel(){
        this.costLabel.string = this.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}
