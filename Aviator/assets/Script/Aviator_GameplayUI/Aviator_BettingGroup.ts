// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Aviator_BettingGroup extends cc.Component {
    @property(cc.Label)
    private flewAwayLabel: cc.Label = null;

    @property(cc.Label)
    private xCostLabel: cc.Label = null;

    protected onDisable(): void {
        this.SetFlewAwayState(false);
        this.SetXCostColor(cc.Color.WHITE);
    }

    public SetFlewAwayState(state: boolean): void {
        this.flewAwayLabel.node.active = state;
    }

    public SetXCostLabel(xCost: number): void {
        this.xCostLabel.string = xCost.toFixed(2) + "x";

    }

    public SetXCostColor(color: cc.Color): void {
        this.xCostLabel.node.color = color;
    }
}
