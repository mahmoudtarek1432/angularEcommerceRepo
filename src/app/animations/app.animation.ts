import { trigger, state, animate, style, transition, animation } from '@angular/animations';

export function dropdown(){
    return trigger('toggle',[
        state('toggled',style({
            display: 'block',
            opacity: '1'
        })),
        state('nottoggled',style({
            
            height: '0%',
            display: 'none'
        })),
        transition('toggled => nottoggled',animate('0.5s ease-in-out'))
    ]);
}

export function modalslide(){
    return trigger('modalslide',[
        state('toggled',style({
            left:'0%'
        })),
        state('nottoggled',style({
            left: '-75%'
        })),
        transition('toggled => nottoggled',animate('0.7s ease-out')),
        transition('nottoggled => toggled',animate('0.7s ease-out'))
    ]);
}

export function mainslide(){
    return trigger('mainslide',[
        state('toggled',style({
            left:'75%'
        })),
        state('nottoggled',style({
            left: '0%'
        })),
        transition('toggled => nottoggled',animate('0.7s ease-out')),
        transition('nottoggled => toggled',animate('1s ease-out'))
    ]);
}

export function shadow(){
    return trigger('clicked',[
        state('toggled',style({
            display: 'block',
            opacity:"1",
            
        })),
        state('nottoggled',style({
            opacity:"0",
            
        })),
        transition('toggled => nottoggled',animate('0.7s ease-out')),
        transition('nottoggled => toggled',animate('1s ease-out'))
    ]);
}

export function searchbar(){
    return trigger('searchbar',[
        state('shown',style({
            border: '2px solid rgba(199, 199, 199, 0.472)',
            width: '270px'
        })),
        state('hidden',style({
            width: '43px',
            backgroundColor: 'transparent',
            border: '0',
        })),
        transition('shown=>hidden',[animate('0.5s ease'),style({border: '0'})]),
        transition('hidden=>shown',animate('1s ease'))
    ])
}

export function visibility(){
    return trigger('visibility',[
        state('shown',style({
           
        })),
        state('hidden',style({
            
        })),
        transition('shown=>hidden',[animate('0.5s ease'),style({display:'none'})]),
        transition('hidden=>shown',[animate('1s ease'),style({display:'block'})])
    ])
}

export function bannerAnimation(){
    return trigger('banner',[
        state('*',style({
            opacity: 1
        })),
        transition(':enter',[style({opacity:0.5}),animate('1s ease-out')]),
        transition(':leave',[animate('5s ease-in'),style({opacity:0.5})])
    ])
}

export function contentAnimation(){
    return trigger('content',[
        state(':enter',style({
            opacity: 1,
            transform: 'translateX(0%)'
        })),
        state(':leave',style({
            opacity: 0
        })),
        transition(':enter',[style({opacity:0.3, transform: 'translateX(-60%)'}),animate('1s ease-out')]),
        transition(':leave',[style({opacity:1}),animate('0.8s ease-out')]),
    ])
}