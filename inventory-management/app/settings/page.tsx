import { ProfileInfo } from "./component/ProfileInfo"
import { StoreInfo } from "./component/StoreInfo"
import { SecurityAndPrefences } from "./component/Security&Preference"
import { DeleteAccount } from "./component/DeleteAccount"
function Settings(){
    return(
        <section className="px-5 mt-8 grid gap-5">
            <div className="flex justify-between gap-2">
                <ProfileInfo />
                <StoreInfo />
            </div>
            <SecurityAndPrefences />
            <DeleteAccount />
        </section>
    )
}

export default Settings