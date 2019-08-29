var EmailValidator = /** @class */ (function () {
    function EmailValidator() {
    }
    EmailValidator.shouldBeUnique = function (control) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                if (control.value === 'test@123')
                    resolve({ shouldBeUnique: true });
                else
                    resolve(null);
            }, 2000);
        });
    };
    return EmailValidator;
}());
export { EmailValidator };
//# sourceMappingURL=email.validator.js.map