const whitespaceRegex = new RegExp("/^\s*$/");
const imageUrlRegex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif|svg))/,'i');

export function isMissingOrWhitespace(str){
    return !str || whitespaceRegex.test(str);
}

export function isValidImageUrl(url){
    return url && imageUrlRegex.test(url)
}

export function userValidation(req){
    const emptyUsername = isMissingOrWhitespace(req.body.username);
    const emptyFirstName = isMissingOrWhitespace(req.body.firstname);
    const emptyLastName = isMissingOrWhitespace(req.body.lastname);
    const emptyPassword = isMissingOrWhitespace(req.body.password);
    const notPicture = !isValidImageUrl(req.body.imageUrl);
    const noGivenImageUrl = !req.body.imageUrl;

    const usernameTooLong = req.body.username.length > 255;
    const firstNameTooLong = req.body.firstname.length > 255;
    const lastNameTooLong = req.body.lastname.length > 255;
    const imageUrlTooLong = req.body.imageUrl.length > 2048;

    if(usernameTooLong){
        return "Username is too long.";
    }

    if(firstNameTooLong){
        return "First name is too long.";
    }

    if(lastNameTooLong){
        return "Last name is too long.";
    }

    if(imageUrlTooLong){
        return "Image URL is too long.";
    }

    if(emptyUsername){
        return "Username cannot be missing or blank.";
    }
    if(emptyFirstName){
        return "First Name cannot be missing or blank.";
    }
    if(emptyLastName){
        return "Last Name cannot be missing or blank.";
    }
    if(emptyPassword){
        return "Password cannot be missing or blank.";
    }
    if(!noGivenImageUrl && notPicture){
        return "Invalid image URL: Image url is invalid.";
    }
    else{
        return 1;
    }
}