import '../../../assets/css/Form.css';
import LoadingCircle from '../../Fragments/LoadingCircle';
import { useState } from "react";
import { useForm, Controller } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Button, Typography } from "@mui/material";
import { dates, objects, theme, types } from '../../../utilities';
import { 
    MuiStyledAutoComplete, 
    MuiStyledNativeDateTimePicker,
    MuiStyledSnackBar
} from '../../MuiStyled';
import * as DUMMY from '../../../assets/dummy/dummy_post_scenario';
import api from '../../../api';

// As interface, used within this script to keep track of inputs in the form.
const IFORM_INPUTS = Object.freeze({
    industry: "industry",                                       //  業種
    business: "business",                                       //  業務
    operatingConditions: "operatingConditions",                 //  運用条件
    equipmentUsed: "equipmentUsed",                             //  使用機器
    exitCondition: "exitCondition",                             //  終了条件
    startCriteria: "startCriteria"                              //  開始条件
});

// Options within the combo box
const FORM_OPTIONS = Object.freeze({
    ...IFORM_INPUTS,
    industry: ["土木"],                                         // 業種
    business: ["地ならし", "運搬"],                             //  業務
    operatingConditions: ["安全優先", "業務優先"],              //  運用条件
    equipmentUsed: ["Mover", "振動ローラー", "ダンプカー"],     //  使用機器
    exitCondition: ["作業終了"]                                //  終了条件
})

// Default values of the input fields
const FORM_INPUT_DEFAULT_VALUES = {
    ...IFORM_INPUTS,
    industry: null,                                               //  業種                    
    business: null,                                               //  業務
    operatingConditions: null,                                    //  運用条件
    equipmentUsed: null,                                          //  使用機器                                       
    exitCondition: null,                                          //  終了条件
    startCriteria: undefined                                      //  開始条件
}

/**
 * -- Form component
 *   Handles POST scenario to API.
 * @params --
 * @returns <Form> (JSX element)
 */
export default function Form() {

    const [isLoading, setIsLoading] = useState(false);
    const [snackBarProps, setSnackBarProps] = useState({ open: false, msg: "", severity: "" });

    /**
     * For more info see: npm react-hook-form 
     * 
     * register => register field into the form.
     * handleSubmit => function that wraps our custom onSubmit as a callback function
     * control =>  is a prop that we get back from the useForm Hook and pass into the input
     * errors => is exposed from formState and identifies if an error occurs within the form.
     * defaultValues => is the default value of the input fields that is registered in the form.
     */
    const {
        register,
        handleSubmit,
        control,
        formState: { 
            errors,
        }
    } = useForm({
        defaultValues: {
            ...FORM_INPUT_DEFAULT_VALUES
        }
    });

    /**
     * Handle API query states
     * For more info see: npm react-query
     * 
     * mutate => the function to trigger the start of mutation.
     * mutationFn => The mutation function / Function to execute on mutate.
     * onMutate => function that is executed when starts mutating.
     * onSuccess => function that is exeuted when mutation was successful.
     * onError => function that is executed when mutation has error. Like a catch block in a try catch.
     * onSettled => function that is executed no matter if success or error. Like a finally block in a try catch.
     */
    const { mutate: registerScenario } = useMutation({
        mutationFn: api.scenario.registerScenario,
        onMutate: _ => setIsLoading(true),
        onSuccess: (new_scenario) => {
            console.log("Success:: POST scenario", new_scenario);
            setSnackBarProps(prev => ({
                ...prev,
                msg: "Scenario registration successful",
                severity: types.ALERT.success
            }));
        },
        onError: (error) => {
            console.error('onError', error);
            setSnackBarProps(prev => ({
                ...prev,
                msg: "Failed to register scenario",
                severity: types.ALERT.error
            }));
        },
        onSettled: _ => {
            setIsLoading(false);
            setSnackBarProps(prev => ({ ...prev, open: true}));
        },
    },);

    /**
     * Handling MuiSnackbar onClose event
     * @param {*} _ => ignored parameter
     * @param {*} reason => reason
     */
    function handleClose(_, reason) {
        if (reason === 'clickaway') return;

        setSnackBarProps(prev => ({...prev, open: false}));
    }

    /**
     * Handling submit to form. 
     * Callback function to useForm hook's handleSubmit
     * @param {*} data => data from form inputs
     */
    function onSubmit(data) {

        // log to console if form has errors.
        if (!objects.isEmptyObject(errors)) {
            console.error(errors);
        }

        const { startCriteria } = data;
        const dummyJSON = createScenario({ ...data });

        // undefined / not supported pattern
        if (!dummyJSON) {
            console.log("Unsupported pattern of", dummyJSON);

            setSnackBarProps({
                open:true,
                msg: "This pattern not supported",
                severity: types.ALERT.warning
            });
            return;
        }

        // continue registration ---> 
        const scenario = {
            ...dummyJSON,
            d_scenario_exec_cond: {
                ...dummyJSON.d_scenario_exec_cond,
                start_schedule_at: startCriteria
            }
        }

        console.log("Registering scenario", data);
        console.log("Data", scenario)
        registerScenario(scenario);
    }

    /**
     * Handles creation of scenario based on input combination.
     * @param {*} params => object defined by FORM_INPUT_DEFAULT_VALUES
     * @returns object | undefined = > dummyScenario from  dummy_post_scenario.js
     */
    function createScenario({...params} = FORM_INPUT_DEFAULT_VALUES) {

        /**
         * Unused but available for fetching.
         * industry, equipmentUsed, exitCondition, startCriteria
         */
        const { 
            business, 
            operatingConditions, 
        } = params;

        // Supported scenarios are listed here.
        const scenarios = Object.freeze({
            scenarioA: { business: "地ならし", operatingConditions: "安全優先"},
            scenarioB: { business: "地ならし", operatingConditions: "業務優先"},
            scenarioC: { business: "運搬", operatingConditions: "安全優先"},
            scenarioD: { business: "運搬", operatingConditions: "業務優先"},
        })

        // first occurence of pattern only
        const pattern = Object.entries(scenarios).filter(
            ([_, val]) => {
                return (
                    val['business'] === business && 
                    val['operatingConditions'] === operatingConditions
                )
            }
        )[0];

        console.log("Pattern detected: ", pattern)

        if (!pattern) return;

        const [patternKey] = pattern;
        /**
         * For now we will neither use shallow or deep copy.
         * As it can affect performance especially for deep copy.
         * Only assign dummy data from dummy_post_scenario.js
         */
        switch (patternKey) {
            case 'scenarioA':
                return DUMMY.usecase1_setscenario_mover;
            case 'scenarioB':
                return DUMMY.usecase1_setscenario_mover_short;
            case 'scenarioC':
                return DUMMY.usecase1_setscenario_temi;
            case 'scenarioD':
                return DUMMY.usecase1_setscenario_temi;
            default:
                return undefined;
        }
    }

    return (
        <>
            <MuiStyledSnackBar
                open={snackBarProps.open}
                message={snackBarProps.msg}
                severity={snackBarProps.severity}
                onClose={handleClose}
            />
            <form className='form-base' onSubmit={handleSubmit(onSubmit)}>
                <header>
                    <Typography variant="h6"> Scenario Registration </Typography>
                    <Typography variant="subtitle1"> Fields with {"*"} are required. </Typography>
                </header>

                <div className='form-body'>
                    <fieldset>
                        <div className="form-group-item">
                            <label>業種</label>
                            <Controller
                                name={IFORM_INPUTS.industry}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <MuiStyledAutoComplete
                                        options={FORM_OPTIONS.industry}
                                        onChange={(_, data) => onChange(data)}
                                        value={value}
                                    />
                                )}
                            />
                        </div>
                        <div className="form-group-item">
                            <label>業務</label>
                            <Controller
                                name={IFORM_INPUTS.business}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <MuiStyledAutoComplete
                                        options={FORM_OPTIONS.business}
                                        onChange={(_, data) => onChange(data)}
                                        value={value}
                                    />
                                )}
                            />
                        </div>
                        <div className="form-group-item">
                            <label>運用条件</label>
                            <Controller
                                name={IFORM_INPUTS.operatingConditions}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <MuiStyledAutoComplete
                                        options={FORM_OPTIONS.operatingConditions}
                                        onChange={(_, data) => onChange(data)}
                                        value={value}
                                    />
                                )}
                            />
                        </div>
                        <div className="form-group-item">
                            <label>使用機器</label>
                            <Controller
                                name={IFORM_INPUTS.equipmentUsed}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <MuiStyledAutoComplete
                                        options={FORM_OPTIONS.equipmentUsed}
                                        onChange={(_, data) => onChange(data)}
                                        value={value}
                                    />
                                )}
                            />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group-item">
                            <label>開始条件<span aria-label='required'>*</span></label>
                            <MuiStyledNativeDateTimePicker
                                required={true}
                                defaultValue={dates.getDateTime({ step: 1 })}
                                inputRef={{...register(IFORM_INPUTS.startCriteria)}}
                            />
                        </div>
                        <div className="form-group-item">
                            <label>使用機器</label>
                            <Controller
                                name={IFORM_INPUTS.exitCondition}
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <MuiStyledAutoComplete
                                        options={FORM_OPTIONS.exitCondition}
                                        onChange={(_, data) => onChange(data)}
                                        value={value}
                                    />
                                )}
                            />
                        </div>
                    </fieldset>
                </div>
                <Button
                    variant="contained"
                    type="submit"
                    aria-label='post-scenario'
                    disableRipple
                    disabled={isLoading}
                    startIcon={isLoading ? <LoadingCircle /> : <></>}
                    sx={{
                        width: "220px",
                        position: "relative",
                        height: 40,
                        margin: '10px auto',
                        backgroundColor: theme.palette.primary.main
                    }}
                >
                    実行
                </Button>
            </form>
        </>
    )
}