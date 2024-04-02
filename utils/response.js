let resDocCreated = (res, data) => {
    return res.status(200)
        .send({
            statusCode: "200",
            statusMessage: "Document created successfully!",
            data,
        });
};

let resDocUpdated = (res, data) => {
    return res
        .status(200)
        .send({
            statusCode: "200",
            statusMessage: "Document updated successfully!",
            data,
        });

};

let resAlreadyExists = (res, data) => {
    return res
        .status(409)
        .send({ statusCode: "409", statusMessage: "User already exists!", data });
};

let resDocDeleted = (res, data) => {
    return res
        .status(204)
        .send({
            statusCode: "204",
            statusMessage: "Document deleted successfully!",
            data,
        });

};

let resFound = (res, data) => {
    return res
        .status(200)
        .send({ statusCode: "200", statusMessage: "Document Found!", data });
};




let resPaginationDoc = (res, data, paginate) => {
    return res
        .status(200)
        .send({
            statusCode: "200",
            statusMessage: "Document Found!",
            data,
            paginate,
        });

};

let resNotFound = (res, error) => {
    return res
        .status(203)
        .send({ statusCode: "203", statusMessage: "Document Not Found!", error });
};

let resErrorOccurred = (res, error) => {
    return res
        .status(203)
        .send({ statusCode: "203", statusMessage: "Error Occurred!", error });
};

let resMustBeUnique = (res, msg) => {
    return res
        .status(409)
        .send({ statusCode: "409", statusMessage: msg, data: null });
};


let resAllInputsRequired = (res, error) => {
    return res.status(409)
        .send({ statusCode: "409", statusMessage: "All Inputs Required", error });
}

let resInvalidToken = (res, error) => {
    return res
        .status(401)
        .send({ statusCode: "401", statusMessage: "Invalid token", error });
};

let resServerError = (res, error) => {
    if (error.errors) {
        if (error.errors[0].validatorKey === "not_unique") {
            let errMsg = String(error.errors[0].message);
            return resErrorOccurred(res, errMsg.replace("_u1", ""));
        }
    }   
    return res
        .status(500)
        .send({
            statusCode: "500",
            statusMessage: "Internal Server Error!",
            error,
        });
};





const resPasswordMismatch = (res) => {
    return res.status(400).json({ error: "Password and confirm password fields should be the same" });
}
module.exports = {
    resNotFound,
    resServerError,
    resDocCreated,
    resDocUpdated,
    resAlreadyExists,
    resErrorOccurred,
    resFound,
    resDocDeleted,
    resPaginationDoc,
    resMustBeUnique,
    resInvalidToken,
    resAllInputsRequired,
    resPasswordMismatch
};