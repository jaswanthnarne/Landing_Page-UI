// Cloudinary Direct Signed Upload Utility
// Consumed by the Admin Panel to upload slide images, logos, and lab covers

const CLOUDINARY_CLOUD_NAME = 'ddwxonjbd';
const CLOUDINARY_API_KEY = '329728642674658';
const CLOUDINARY_API_SECRET = 'BQ2JMqkjFmSfE6yBTIZrFKRCxLo';

/**
 * Helper to compute SHA-1 hash for Cloudinary request signatures
 * @param {string} message - Sorted parameter query string with appended API secret
 * @returns {Promise<string>} Hex signature hash
 */
async function computeSHA1(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-1', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Uploads a file directly to Cloudinary using signed authentication
 * @param {File|Blob} file - The file/blob to upload
 * @param {string} [folder] - Optional destination folder inside Cloudinary (e.g. 'ethnotech')
 * @returns {Promise<string>} Secure URL of the uploaded image
 */
export async function uploadToCloudinary(file, folder = 'ethnotech') {
    if (!file) throw new Error('No file provided for upload.');

    const timestamp = Math.floor(Date.now() / 1000);

    // Create signature payload
    // Parameters must be sorted alphabetically: 'folder', 'timestamp'
    let signatureString = `folder=${folder}&timestamp=${timestamp}${CLOUDINARY_API_SECRET}`;
    const signature = await computeSHA1(signatureString);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', CLOUDINARY_API_KEY);
    formData.append('timestamp', timestamp.toString());
    formData.append('folder', folder);
    formData.append('signature', signature);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Failed to upload to Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
}
