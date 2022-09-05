//detta kommer att vara i två olika filer, men skriver dom i samma just nu

const bcrypt = require('bcrypt');
const saltRounds = 10;
const userSchema = mongoose.Schema; //detta är för mongoDB, men har det med som exempel. databasen är här.


//det nedan är ett exempel på hur vi skickar och hämtar information från databasen

app.post('/api/users/register', (req, res) => {
    const user = new User(req.body);

    //här ska vi hasha lösenordet (rad 23 och nedåt)

    user.save((err, doc) => {
        if(err) return res.json({ success: false, err: err });
        res.status(200).json({
            success: true,
            userData: doc})
    })
})

userSchema.pre('save', function ( next ){
    var user = this; //alltså userSchema

    if(user.isModified('password')){ //bara när password ändras triggas det nedan

        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err) //vi gör inget nedan, utan detta tar oss till save på rad 15

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next;
                user.password = hash;
            })
        })
    } else {
        next()
    }
});