# Bootstrap-4-DialogBox-Js
DialogBox Plugin with Bootstrap 4 Modal + Jquery Extended

[Bootstrap Setup Documentation](https://jekyllrb.com/docs/home/).

## Usage
Loading Indicator

```javascript
$.DialogBox().ShowLoadingIndicator();

$.DialogBox().HideLoadingIndicator();
```
Dialog Box

```javascript
$.DialogBox().ShowDialogBox(); // Normal Information Message Box
$.DialogBox().ShowConfirmDialogBox(); // A Confirmation Box
$.DialogBox().ShowAlertDialogBox(); // An Alert Message Box
$.DialogBox().ShowWarningDialogBox(); // A Warning Message Box
$.DialogBox().ShowSuccessDialogBox(); // A Success Message Box

$.DialogBox().ShowSuccessDialogBox({
    Title: 'Success',
    Message: 'This show custom message and function callback.',
    CallBack:function(result){
        if(result == true){
            alert(result);
        }
    }
});

 $.DialogBox().ShowDialogBox({
    Type: 'dark',
    Title: 'Dark Message Box',
    Message: 'This show custom message and function callback.',
    Size: 'modal-lg',
    Buttons:[{
        label: 'Click Me',
        cssClass: 'btn-light',
        action: function(obj){
            alert('inside button');
            obj.modal.HideDialog(); // must put for close the Dialog
        }
    }]
});
```
