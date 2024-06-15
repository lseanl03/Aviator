// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import Aviator_GameManager from "../Manager/Aviator_GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Aviator_WaitingGroup extends cc.Component {
    
    private waitingTime: number = 0;
    private startProgress : boolean = false;
    private progress: number = 1;

    @property(cc.ProgressBar)
    private waitingProgressBar: cc.ProgressBar = null;

    protected onLoad(): void {
    }
    
    protected onEnable(): void {
        this.startProgress = true;
        this.progress = 1;
        
        this.SetWaitingProgress(1);
        this.waitingTime = Aviator_GameManager.Instance.GetWaittingRoundTime();
    }

    protected onDisable(): void {
        Aviator_GameManager.Instance.SetIsWaittingRound(false);
    }

    protected update(dt: number): void {
        this.StartProgress(dt);
    }
    
    private SetWaitingProgress(progress: number) {
        this.waitingProgressBar.progress = progress;
    }

    private StartProgress(dt: number) {
        if(this.startProgress){

            this.progress -= dt / this.waitingTime;
            this.SetWaitingProgress(this.progress);

            if(this.progress <= 0){
                this.progress = 0;
                this.startProgress = false;
                this.node.active = false;
            }
        }
    }
}
