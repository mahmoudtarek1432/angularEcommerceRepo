import { MatDialog } from "@angular/material/dialog";

export class mobileDialog{
    static openResponsiveDialog(dialogModule:MatDialog, dialogComponent, data:any = null,width:any = null,Height:any = '600px'){
        var positionBottom = null;
        var Width = width;
        var pClass = null;
        var height = Height;
        if(window.innerWidth < 600){
        Width = window.innerWidth+'px';
        positionBottom = '0px'
        height = null;
        pClass = 'dialog-mobile';
        } // if the window is mobile change properties
        
        dialogModule.open(dialogComponent,{
        panelClass: pClass,
        maxWidth:Width,
        width: Width,
        position:{bottom: positionBottom},
        data:data
    })
    }
}
