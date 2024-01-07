class CMNotify{
    constructor(options = {}){
        const { position = 'bottom-right', duration = '5', zIndex = 900 } = options;
        this.position = position
        this.duration = duration;
        this.zIndex = zIndex;
        this.notifications = [];
        this.container = this.createContainer();
        this.hideCallback = null;
        this.hideCallbackParams = null;
    }

    createContainer(){
        const container = document.createElement('div');
        container.classList.add('cmnotify-container', `cmnotify-${this.position}`);
        container.style.zIndex = this.zIndex;
        document.body.appendChild(container);
        return container;
    }
    
    show(options = {}){
        const { type = 'primary', message = '', persistent = false, icon, showCallback, showCallbackParams, hideCallback, hideCallbackParams } = options; 
        const  notification = this.createNotification(type, message, icon);
        this.container.appendChild(notification);

        notification.classList.add('cmnotify-sh');
        
        notification.timeoutId = setTimeout(() => {
            notification.classList.add('cmnotify-show');
            let timetohide;

            if(!persistent){
                timetohide = setTimeout(() => {
                    this.hide(notification);
                }, this.duration * 1000);
            }

            notification.addEventListener('click', () => {
                clearTimeout(notification.timeoutId);
                if(timetohide){
                    clearTimeout(timetohide);
                }
                this.hide(notification);
            });

        }, 10);

        if(hideCallback){
            this.hideCallback = hideCallback;
        }

        if(hideCallbackParams){
            this.hideCallbackParams = hideCallbackParams;
        }

        if(showCallback){
            if(typeof showCallback === 'function'){
                showCallback(showCallbackParams);
            }else if(typeof showCallback === 'string'){
                const callbackFunction = window[showCallback];
                if(typeof callbackFunction === 'function'){
                    callbackFunction(showCallbackParams);
                }else{
                    console.log('Función no valida');
                }
            }

        }

    }

    createNotification(type, message, icon){
        const notification = document.createElement('div');
        notification.classList.add('cmnotify',`cmnotify-${type}`);
        
        const borderRadius = message.length > 40 ? '16px' : '29.5px';
        notification.style.borderRadius = borderRadius;
        
        const userIcon = icon || this.icon(type);
        notification.innerHTML = `<div class="cmnotify-icon">${userIcon}</div>
                                  <div class="cmnotify-text">${message}</div>
                                 `;
        return notification;
    }

    icon(type){
        const icons = {
            primary: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#007bff" class="bi bi-bell" viewBox="0 0 16 16"><path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/></svg>',
            secundary: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6c757d" class="bi bi-question-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/></svg>',
            success: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#28a745" class="bi bi-check-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05"/></svg>',
            danger: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/></svg>',
            warning: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffc107" class="bi bi-exclamation-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/></svg>',
            info: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#6c757d" class="bi bi-info-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/><path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0"/></svg>',
            light: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#f8f9fa" class="bi bi-exclamation-diamond" viewBox="0 0 16 16"><path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z"/><path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z"/></svg>',
            dark: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#343a40" class="bi bi-exclamation-diamond-fill" viewBox="0 0 16 16"><path d="M9.05.435c-.58-.58-1.52-.58-2.1 0L.436 6.95c-.58.58-.58 1.519 0 2.098l6.516 6.516c.58.58 1.519.58 2.098 0l6.516-6.516c.58-.58.58-1.519 0-2.098zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>',
        }

        return icons[type] || '';
    }

    hide(notification){
        if(notification && this.container.contains(notification)){
            notification.classList.remove('cmnotify-show');
            notification.classList.remove('cmnotify-hide');

            setTimeout(() => {
                this.notifications.splice(this.notifications.indexOf(notification), 1);
                if(notification && this.container.contains(notification)){
                    this.container.removeChild(notification);
                }

                if(this.hideCallback){
                    if(typeof this.hideCallback === 'function'){
                        this.hideCallback(this.hideCallbackParams);
                    }else if(typeof this.hideCallback === 'string'){
                        const callbackFunction = window[this.hideCallback];
                        if(typeof callbackFunction === 'function'){
                            callbackFunction(this.hideCallbackParams);
                        }else{
                            console.log('Función no valida');
                        }
                    }
        
                }

            }, 200);
        }
    }

}