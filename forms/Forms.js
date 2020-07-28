import * as CreateUserForms from './CreateUserForms'
import * as CreateAthleteForms from './SetupAthleteForm'
import FormContainer from '../containers/FormContainer'

export {default as LoginForm} from './LoginForm'

export function CreateUserForm(props) {
    return (
    <FormContainer
        onCancel={() => props.onCancel()}
        onCompleted={(form) => props.onCompleted(form)} 
        forms={[
            CreateUserForms.FirstNameForm,
            CreateUserForms.LastNameForm,
            CreateUserForms.EmailForm,
            CreateUserForms.PasswordForm,
        ]}
    />
    );
}

export function CreateAthleteForm(props) {
    return (
        <FormContainer
            key={2}
            onCancel={() => setAuthentiationState(State.LOGGED_OUT)}
            onCompleted={(form) => {
                createAthlete({age: form.age, height: 60, weight: 150, gender: form.gender}).then(() => {
                    setAuthentiationState(State.LOGGED_IN)
                })
            }} 

            forms={[
                CreateUserForms.AccountCreatedForm,
                CreateAthleteForms.AgeForm,
                CreateAthleteForms.HeightForm,
                CreateAthleteForms.GenderForm,
                CreateAthleteForms.GymAccessForm,
                CreateAthleteForms.WorkoutEquipmentForm
        ]}/>
    )
};