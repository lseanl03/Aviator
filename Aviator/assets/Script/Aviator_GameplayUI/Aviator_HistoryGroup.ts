// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Aviator_HistoryGroup extends cc.Component {

    private isShow: boolean = false;

    @property(cc.Prefab)
    private historyPrefab: cc.Prefab = null;

    @property(cc.Node)
    private historyList: cc.Node = null;

    @property(cc.Node)
    private roundHistoryGroup: cc.Node = null;

    @property(cc.Node)
    private roundHistoryList: cc.Node = null;

    @property(cc.Button)
    private historyButton: cc.Button = null;

    protected onLoad(): void {
        this.historyButton.node.on('click', this.OnHistoryButtonClick, this);
    }

    private OnHistoryButtonClick() {
        this.SetRoundHistoryGroupState();
    }

    public SetRoundHistoryGroupState() {
        this.isShow = !this.isShow;
        this.roundHistoryGroup.active = this.isShow;
    }

    public GetRounndHistoryList() {
        return this.roundHistoryList;
    }

    public GetHistoryList() {
        return this.historyList;
    }

    public GetHistoryButton() {
        return this.historyButton;
    }

    public SpawnHistory(cost: number){
        let history = cc.instantiate(this.historyPrefab);   
    }
}
