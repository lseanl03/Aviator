// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Aviator_DatCuoc from "./Aviator_DatCuoc";
import Aviator_BettingGroup from "./Aviator_BettingGroup";
import Aviator_TopBetGroup from "./Aviator_TopBetGroup";
import Aviator_WaitingGroup from "./Aviator_WaitingGroup";
import Aviator_NhomDatCuoc from "./Aviator_NhomDatCuoc";
import Aviator_History from "./Aviator_History";
import Aviator_HistoryGroup from "./Aviator_HistoryGroup";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Aviator_GameplayUI extends cc.Component {
    
    public static Instance: Aviator_GameplayUI = null;

    @property(Aviator_TopBetGroup)
    public topBetGroup: Aviator_TopBetGroup = null;

    @property(Aviator_BettingGroup)
    public bettingGroup: Aviator_BettingGroup = null;

    @property(Aviator_WaitingGroup)
    public waitingGroup: Aviator_WaitingGroup = null;

    @property(Aviator_HistoryGroup)
    public historyGroup: Aviator_HistoryGroup = null;

    @property(Aviator_NhomDatCuoc)
    public nhomDatCuoc: Aviator_NhomDatCuoc = null;

    onLoad() {
        Aviator_GameplayUI.Instance = this;
    }

    public SetWaitingGroupState(state: boolean){
        this.waitingGroup.node.active = state;
    }

    public SetBettingGroupState(state: boolean){
        this.bettingGroup.node.active = state;
    }

    public HandleStartRound(){
        this.SetBettingGroupState(true);
        this.SetWaitingGroupState(false);

        //this.betBoxGroup.SetCashOutStateBetBox();
    }

    public HandleEndRound(){
        this.bettingGroup.SetFlewAwayState(true);
        this.bettingGroup.SetXCostColor(cc.Color.RED);
    }

    public HandleWaittingRound(){
        this.SetWaitingGroupState(true);
        this.SetBettingGroupState(false);
    }

}
