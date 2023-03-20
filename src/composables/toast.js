import {ref, onUnmounted} from 'vue';

export const useToast = () => {
    onUnmounted(() => {
        console.log('unmounted');
        clearTimeout(timeout.value);
    });
    
    const showToast = ref(false);
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const timeout = ref(null);
    
    const triggerToast = (message, type = 'success') => {
        showToast.value = true;
        toastMessage.value = message;
        toastAlertType.value = type;
        timeout.value = setTimeout(() => {
            console.log('hello');
            showToast.value = false;
            toastMessage.value = '';
            toastAlertType.value = '';
        }, 3000);
    }
    
    return{
        showToast,
        triggerToast,
        toastMessage,
        toastAlertType,
    }
}