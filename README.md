#Angular wheel
---

Mouse wheel event wrapper directive for AngularJS without additional dependencies.

Attention! It's just an alpha version.

Usage
-----

         eve-wheel="{expression}"
    eve-wheel-next="{expression}"
    eve-wheel-prev="{expression}"
    
The event callback can receive 2 extra arguments, the most interesting of them is $delta.

    eve-wheel="myCallback($event, $delta)"

Install
-------

    bower install angular-wheel
