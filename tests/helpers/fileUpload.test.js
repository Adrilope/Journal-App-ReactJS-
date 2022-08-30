import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../../src/helpers/fileUpload"


cloudinary.config({
    cloud_name: 'cursoreact',
    api_key: '915557883638721',
    api_secret: 'Xkw7EjBvz_XSI_ZdCD1ZHQFvA3I',
    secure: true
})


describe('Tests with fileUpload', () => { 
    test('should successfully upload the file to Claudinary', async() => { 
        const imageUrl = 'https://www.civitatis.com/blog/wp-content/uploads/2016/09/montes-tatra.jpg'
        const resp = await fetch(imageUrl)
        const blob = await resp.blob()
        const file = new File([blob], 'image.jpg')

        const url = await fileUpload(file)

        expect(typeof url).toBe('string')

        // delete the test image in cloudinary
        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')
        
        await cloudinary.api.delete_resources(['journal/' + imageId], {
            resource_type: 'image'
        })
    })
    

    test('should return null', async() => { 
        const file = new File([], 'image.jpg')

        const url = await fileUpload(file)

        expect(url).toBe(null)
    })
})