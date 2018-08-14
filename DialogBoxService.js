var R2_Modal = Object.create(HTMLElement.prototype);
R2_Modal.createdCallback = function() 
{
	this.innerHTML = '<div id="DialogBox" class="modal fade" tabindex="-1" role="dialog">'+
					  '<div class="modal-dialog" id="DialogModal" role="document">'+
						'<div class="modal-content" >'+
						  '<div class="modal-header" id="DialogHeader">'+
							'<h5 class="modal-title" id="DialogBox-Title"></h5>'+
							'<button type="button" id="DialogBox-Close" data-dismiss="modal" class="close" aria-label="Close">'+
							 ' <span aria-hidden="true">&times;</span>'+
							'</button>'+
						  '</div>'+
						  '<div class="modal-body">'+
							'<p class-"modal-message" id="DialogBox-Message" ></p>'+
						  '</div>'+
						  '<div class="modal-footer" id="DialogFooter">'+
						  '</div>'+
						'</div>'+
					  '</div>'+
					'</div>';
};
document.registerElement('R2-Modal', {prototype: R2_Modal});
var R2_Loading = Object.create(HTMLElement.prototype);
R2_Loading.createdCallback = function() {
	this.innerHTML = '<style>.loader {'+
					 '  border: 8px solid #f3f3f3;'+
					 '  border-radius: 50%;'+
					 '  border-top: 8px solid #3498db;'+
					 '  width: 120px;'+
					 '  height: 120px;'+
					 '  -webkit-animation: spin 2s linear infinite;'+
					 '  animation: spin 1s linear infinite;}'+
					 '@-webkit-keyframes spin {'+
					 '  0% { -webkit-transform: rotate(0deg); }'+
					 ' 100% { -webkit-transform: rotate(360deg); }'+
					 '}'+
					 '@keyframes spin {'+
					 '  0% { transform: rotate(0deg); }'+
					 '  100% { transform: rotate(360deg); }'+
					 '}</style>'+
					 '<div id="DialogLoading" class="modal fade" tabindex="-1" role="dialog">'+
					 	'<div class="modal-dialog"  role="document">'+
					 		'<div class="" style="background-color:#fff0; border:0px; width:40%;margin:0 auto;">'+
					 		'<div class="modal-body loader">'+
					 		'</div>'+
					 		'</div>'+
					 	'</div>'+
					 '</div>';
};
document.registerElement('R2-Loading', {prototype: R2_Loading});
(function($){
    $.DialogBox = function()
        {
            if (!document.contains(document.getElementsByTagName("R2-MODAL")[0])) 
            {
                var R2 = document.createElement('R2-Modal');
                var body = document.getElementsByTagName("BODY")[0];
                body.appendChild(R2);
            }
            if (!document.contains(document.getElementsByTagName("R2-LOADING")[0])) 
            {
                var R2 = document.createElement('R2-LOADING');
                var body = document.getElementsByTagName("BODY")[0];
                body.appendChild(R2);
            }
            
            this.TYPE_PRIMARY = 'primary';
            this.TYPE_SECONDARY = 'secondary';
            this.TYPE_SUCCESS = 'success';
            this.TYPE_WARNING = 'warning';
            this.TYPE_DANGER = 'danger';
            this.TYPE_INFO = 'info';
            this.TYPE_LIGHT = 'light';
            this.TYPE_DARK = 'dark';
            this.DEFAULT_TEXTS = {};
            this.DEFAULT_TEXTS[this.TYPE_INFO] = 'Information';
            this.DEFAULT_TEXTS[this.TYPE_PRIMARY] = 'Information';
            this.DEFAULT_TEXTS[this.TYPE_SECONDARY] = 'Information';
            this.DEFAULT_TEXTS[this.TYPE_SUCCESS] = 'Success';
            this.DEFAULT_TEXTS[this.TYPE_WARNING] = 'Warning';
            this.DEFAULT_TEXTS[this.TYPE_DANGER] = 'Danger';
            this.DEFAULT_TEXTS[this.TYPE_LIGHT] = 'Information';
            this.DEFAULT_TEXTS[this.TYPE_DARK] = 'Information';
            this.SIZE_NORMAL = '';
            this.SIZE_SMALL = 'modal-sm';
            this.SIZE_LARGE = 'modal-lg';
            this.BUTTON_SIZES = {};
            this.BUTTON_SIZES[this.SIZE_NORMAL] = '';
            this.BUTTON_SIZES[this.SIZE_SMALL] = 'btn-sm';
            this.BUTTON_SIZES[this.SIZE_LARGE] = 'btn-lg';
            this.UserOptions = {};
            this.DefaultOptions = {
                Type: this.TYPE_PRIMARY,
                Size: this.SIZE_NORMAL,
                cssClass:'',
                CloseAble:true,
                Title: this.DEFAULT_TEXTS[this.TYPE_PRIMARY],
                Message: 'No Message',
                Buttons:[{
                        label: 'Close',
                        action: function(obj){
                            if (typeof obj.modal.UserOptions.CallBack === 'function' && obj.modal.UserOptions.CallBack.call(this, true) === false)
                            {
                                return false;
                            }
                            obj.modal.HideDialog();
                        }
                    }],
                CallBack:null
            };
            this.InitialOptions = function (UserOptions){
                this.UserOptions = Object.assign(this.DefaultOptions, UserOptions);
                return this;
            };
            this.createTitleContent= function () {
                var DialogModal = document.getElementById("DialogModal");
                var DialogHeader = document.getElementById("DialogHeader");
                var DialogTitle = document.getElementById("DialogBox-Title");
                if (typeof this.UserOptions.Title !== 'undefined')
                {
                    DialogTitle.innerHTML = this.UserOptions.Title;
                }
                if (typeof this.UserOptions.Type !== 'undefined')
                {
                    DialogHeader.className = 'modal-header alert alert-'+this.UserOptions.Type;
                }
                if (typeof this.UserOptions.Size !== 'undefined')
                {
                    DialogModal.className = 'modal-dialog '+this.UserOptions.Size;
                }
            },
            this.createBodyContent= function () {
                var DialogMessage = document.getElementById("DialogBox-Message");
                DialogMessage.innerHTML = this.UserOptions.Message;
            },
            this.removeFooterButtons= function(){
                $('#DialogFooter').html('');
            };
            this.createFooterButtons= function () {
                var that = this;
                that.removeFooterButtons();
                var DialogFooter = document.getElementById("DialogFooter");
                $.each(this.UserOptions.Buttons, function (index, button) 
                {
                    var $button = that.createButton(button);
                    DialogFooter.appendChild($button);
                    
                });
            };
            this.createButton= function (button) {
                var modal = this;
                var $button = document.createElement('button');
                 // Label
                if (typeof button.id !== 'undefined') {
                    $button.id = table.id+"TableHeadView";
                }
                // Label
                if (typeof button.label !== 'undefined') {
                    var html =button.label;
                    if (typeof button.icon !== 'undefined') 
                    {
                        html = '<span class="'+button.icon+'" title="'+button.icon+'" aria-hidden="true"></span>'+html;
                    }
                    $button.innerHTML = html;
                }
                // title
                if (typeof button.title !== 'undefined') {
                    $button.setAttribute('title',  button.title);
                }
                // Css class
                if (typeof button.cssClass !== 'undefined' && $.trim(button.cssClass) !== '') {
                    $button.className = 'btn '+ button.cssClass+' '+ this.BUTTON_SIZES[this.UserOptions.Size];
                } 
                else
                {
                    $button.className = 'btn btn-'+this.UserOptions.Type+' '+ this.BUTTON_SIZES[this.UserOptions.Size];
                }
                // Button on click
                $button.addEventListener("click", function(event){
                     if (typeof button.action === 'function') {
                        return button.action.call(this,{modal,event});
                    }
                });
                return $button;
            };
            this.DisableClose = function(Enable){
                if(Enable){
                    $('#DialogBox').modal({
                        backdrop: Enable,
                        keyboard: Enable
                    })
                }
                else{
                    $('#DialogBox').modal({
                        backdrop: 'static',
                        keyboard: Enable
                    })
                }
            };
            this.ShowDialog= function () {
                this.BuildModal();
                $("#DialogBox").modal('show');
                return this;
            };
            this.HideDialog= function () {
                $("#DialogBox").modal('hide');
                return this;
            };
            this.ShowLoadingIndicator = function(){
                $('#DialogLoading').modal({
                        backdrop: 'static',
                        keyboard: false
                    })
                $('#DialogLoading').modal('show');
            };
            this.HideLoadingIndicator = function(){
                $('#DialogLoading').modal('hide');
            };
            this.BuildModal = function(){
                this.createTitleContent();
                this.createBodyContent();
                this.createFooterButtons();
                if(typeof this.UserOptions.CloseAble !== 'undefined')
                {
                    this.DisableClose(this.UserOptions.CloseAble);
                }
            };
            //Normal Dialog Mode=> full user options required
            this.ShowDialogBox = function(Options){
                this.InitialOptions(Options);
                this.ShowDialog();
            };
            this.ShowConfirmDialogBox = function(Options = {})
            {
                this.DefaultOptions.Buttons =[
                    {label: 'Yes',
                    //icon:'oi oi-check',
                    cssClass: 'btn-primary',
                    action: function(obj){
                        if (typeof obj.modal.UserOptions.CallBack === 'function' && obj.modal.UserOptions.CallBack.call(this, true) === false)
                        {
                            return false;
                        }
                        return obj.modal.HideDialog();}},		
                    {label: 'No',
                    cssClass: 'btn-danger',
                    action: function(obj){
                        if (typeof obj.modal.UserOptions.CallBack === 'function' && obj.modal.UserOptions.CallBack.call(this, false) === false)
                        {
                            return false;
                        }
                        return obj.modal.HideDialog();
                    }}];
                Options = Object.assign({
                    Title:this.DEFAULT_TEXTS[this.TYPE_INFO],
                    Message: 'Are You Sure? ',
                    CloseAble:false,
                    Type:this.TYPE_INFO}, Options);
                this.InitialOptions(Options);
                this.ShowDialog();
            };
            this.ShowAlertDialogBox = function(Options = {})
            {
                this.DefaultOptions.Buttons =[
                    {label: 'OK',
                    //icon:'glyphicons glyphicons-ok',
                    cssClass: 'btn-danger',
                    action: function(obj){
                        if (typeof obj.modal.UserOptions.CallBack === 'function' && obj.modal.UserOptions.CallBack.call(this, true) === false)
                        {
                            return false;
                        }
                        return obj.modal.HideDialog();}}];
                Options = Object.assign({
                    Title:this.DEFAULT_TEXTS[this.TYPE_DANGER],
                    Message: 'Please Attention!!!',
                    CloseAble:false,
                    Type:this.TYPE_DANGER}, Options);
                this.InitialOptions(Options);
                this.ShowDialog();
            };
            this.ShowWarningDialogBox = function(Options = {})
            {
                this.DefaultOptions.Buttons =[
                    {label: 'OK',
                    //icon:'glyphicons glyphicons-ok',
                    cssClass: 'btn-warning',
                    action: function(obj){
                        if (typeof obj.modal.UserOptions.CallBack === 'function' && obj.modal.UserOptions.CallBack.call(this, true) === false)
                        {
                            return false;
                        }
                        return obj.modal.HideDialog();}}];
                Options = Object.assign({
                    Title:this.DEFAULT_TEXTS[this.TYPE_WARNING],
                    Message: 'Warning ! Warning !',
                    CloseAble:false,
                    Type:this.TYPE_WARNING}, Options);
                this.InitialOptions(Options);
                this.ShowDialog();
            };
            this.ShowSuccessDialogBox = function(Options = {})
            {
                this.DefaultOptions.Buttons =[
                    {label: 'OK',
                    icon:'glyphicons glyphicons-ok',
                    cssClass: 'btn-success',
                    action: function(obj){
                        if (typeof obj.modal.UserOptions.CallBack === 'function' && obj.modal.UserOptions.CallBack.call(this, true) === false)
                        {
                            return false;
                        }
                        return obj.modal.HideDialog();}}];
                Options = Object.assign({
                    Title:this.DEFAULT_TEXTS[this.TYPE_SUCCESS],
                    Message: 'Successful !!!',
                    Type:this.TYPE_SUCCESS}, Options);
                this.InitialOptions(Options);
                this.ShowDialog();
            };

            return this;
        };
})(jQuery);
