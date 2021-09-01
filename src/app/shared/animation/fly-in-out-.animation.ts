import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, state
} from '@angular/animations';

export const flyInOutAnimation = animation(
  [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
      style({ transform: 'translateX(-100px)' }),
      animate(300)
    ]),
    transition('* => void', [
      animate(300, style({ transform: 'translateX(100px)' }))
    ])
  ]
);
