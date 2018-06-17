# jquery-backToTop
Fully customizable jquery back to top button.

## Usage

```javascript
var $button = $.backToTop({options});
```

### Options

| Option | Type | Default | Description |
| :-:|:-:|:-:|:--|
| backgroundColor | string | "#5D5D5D" | Background color of the backToTop |
| bottom | number | 20 | Bottom position (px) |
| color | string | "#FFFFFF" | Text color |
| container | jQuery | $("body") | Container selector |
| divFloat | string | "right" | Float position (left,right) |
| **effect** | string | "none" | Show/Hide effect |
| enabled | boolean | true | BackToTop enabled |
| height | number | 70 | Height of the button (px) |
| icon | string | "fas fa-chevron-up" | Font-awesome icon |
| pxToTrigger | number | 600 | Scroll px to trigger |
| scrollAnimation | number | 0 | Scroll animation |
| **theme** | string | "default" | Theme of the button |
| width | number | 70 | Width of the button |
| zIndex | number | 999 | z-Index of the button |

### Avaiable themes

- default
- fawesome

### Avaiable effects

- none
- fade
- spin
- spin-inverse
- zoom

### API

- Enable the button

>```javascript
>$button.enable(status=boolean, disableEffect=boolean);
>```

- Show button

>```javascript
>$button.show(disableEffect=boolean);
>```

- Hide button

>```javascript
>$button.hide(disableEffect=boolean);
>```

- Toggle button

>```javascript
>$button.toggle(disableEffect=boolean);
>```

- Change theme

>```javascript
>$button.changeTheme(theme);
>```

- Change effect

>```javascript
>$button.changeEffect(effect);
>```

## TO-DO

- Create a nice website for the repo
- More themes
- More effects

## License
This project is licensed under MIT [https://opensource.org/licenses/MIT]

## Author
<a href="http://ppizarror.com" title="ppizarror">Pablo Pizarro R.</a> | 2018