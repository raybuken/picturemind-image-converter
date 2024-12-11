
export const upload = async (formData: FormData) => {
    const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        return {
            url,
            success: true
        }
    } 
    
    return {
        success: false
    }
}