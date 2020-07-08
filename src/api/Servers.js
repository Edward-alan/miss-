import axios from "axios";
import UserManager from "@/core/UserManager"
window.isReresh = false;
const BASE_URL_PRODUCTION = "https://new.tsingmuth.com/admin"; //正式环境
const BASE_URL_TEST = "/api";//开发环境
const BASE_URL = BASE_URL_TEST;

/**
 * Post请求
 */
const LOGIN_IN = `${BASE_URL}/login`;  //登录接口
const ADDED = `${BASE_URL}/exam/add` //添加考试
const REVISE_EXAM = `${BASE_URL}/exam/edit/$1$`  //修改考试信息
const TEMPERATURE = `${BASE_URL}/examiner/add`  //添加考官信息
const MODIFY_EXAMINER = `${BASE_URL}/examiner/edit/$id$`  //修改考官信息  
const EXAM_ANT = `${BASE_URL}/exam/import/$id$`  //导入报名信息
const MODIFIEDGRADES = `${BASE_URL}/exam/change_score/$log_id$/$sign_id$`  //修改成绩
const LOGOUTLOGIN = `${BASE_URL}/logout`  //退出

/**
 * Get请求
 */
// const EXAM_LIST = `${BASE_URL}/exam`; //获取考试列表数据
const EXAMLISTS = `${BASE_URL}/exam/list/$status$`; //考试列表
const INFORMATION = `${BASE_URL}/exam/check/$id$`; //查看考试信息
const EXAMINER_LIST = `${BASE_URL}/examiner`;   //考官列表
const LOOK_OVER = `${BASE_URL}/examiner/edit/$id$`;  //查看考官信息
const QUESTIONS = `${BASE_URL}/paper/list/level`;  //考题列表
const CATEGORY = `${BASE_URL}/paper`;   //考题类目
const DETAILS = `${BASE_URL}/paper/check/$id$/exam_mode`; //考题详情
const CATEGORY_LIST = `${BASE_URL}/paper/cate`;  //查看分类列表
const DETAILS_LIST = `${BASE_URL}/paper/cate/check/$id$`; //查看分类详情
const EVALUATION = `${BASE_URL}/paper/cate/evalute/check/$id$` //查看评价信息
const UNDERTAKER = `${BASE_URL}/agent` //承办商列表
const UPLOADING = `${BASE_URL}/file/qiniu_token`  //上传七牛
const DATASTATISTICS = `${BASE_URL}/`//数据统计
const RECORDS = `${BASE_URL}/exam/exam_log/$id$`//差看考生考试记录 
const CURRENT = `${BASE_URL}/exam/exam_info/$id$`  //已考试，缺考等单场考试列表




function get(url, data, needAuth = true) {
    let config = {
        params:data
    };
    if (needAuth) {
        config.headers = {
            "Authorization": UserManager.getUser()
        }
    }
    return axios.get( url,config );
}

function post(url, data, needAuth = true){
    let config = {};
    if (needAuth) {
        config.headers = {
            "Authorization": UserManager.getUser()
        }
    }
    return axios.post( url,data, config );
}


export const uploadFile = (url,file,params) => {
    const param = new FormData();
    param.append("file", file);
    if(params){
        for(let name in params){
            param.append(name,params[name]);
        }
    } 
    const config = {
      headers: {"Content-Type": "multipart/form-data"}
    };
     return axios.post(url, param, config)
  };

/**
 * Post请求
*/

//登录
export let login = (username, password) => {
    return post(LOGIN_IN, { username, password }, false);
};

axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('user')) {
            config.headers.Authorization = localStorage.getItem('user');
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    });

//退出登录
export let logoutlogin = () => {
    return post(LOGOUTLOGIN);
}; 

//添加考试
export let added = (name, agent_id, examiner_id, exam_room_no, start_time, end_time) => {
    return post(ADDED, {
        name,
        agent_id,
        examiner_id,
        exam_room_no,
        start_time,
        end_time
    });
};

//修改考试信息
export let exam_room_no = (name, agent_id, examiner_id, exam_room_no, start_time, end_time) => {
    return post(REVISE_EXAM.replace("$1$", agent_id), {
        name,
        agent_id,
        examiner_id,
        exam_room_no,
        start_time,
        end_time
    });
};

//添加考官信息
export let temperature = (name, id_card,avatar) => {
    return post(TEMPERATURE, {
        name,
        id_card,
        avatar
    });
};

//修改考官信息
export let modify_examiner = (name, id_card, avatar,id) => {
    return post(MODIFY_EXAMINER.replace("$id$", id), {
        name,
        id_card,
        avatar,
        id
    });
};

//导入报名信息
export let exam_ant = ( file, examiner_id, examId) => {
    return uploadFile(EXAM_ANT.replace("$id$", examId),file,{examiner_id});
};



//修改成绩
export let modifiedgrades = ( base, score, mo_score, shi_score, log_id, sign_id) => {
    return post(MODIFIEDGRADES.replace("$log_id$", log_id).replace( "$sign_id$", sign_id ), {
        base, 
        score, 
        mo_score, 
        shi_score, 
        log_id, 
        sign_id,
    });
};

/**
 * Git请求
*/

//获取考试列表数据
// export let exam_list = () => {
//     return axios.get(EXAM_LIST);
// };

//查看考试信息 
export let information = ( id ) => {
    return get(INFORMATION.replace("$id$", id),{id}, true)
};

//考官列表
export let examinerList = ( id ) => {
    return get(EXAMINER_LIST,{
        id_card:id
    },true);
};

//查看考官信息
export let look_over = (id) => {
    return get(LOOK_OVER.replace("$id$", id), {
        id
    });
};


//考题列表
export let questions = () => {
    return get(QUESTIONS,null,true);
};

//考题类目
export let category = () => {
    return get(CATEGORY);
};

//考题详情
export let details = ( id ) => {
    return get(DETAILS.replace("$id$", id),{
        id
    });
};

//查看分类列表
export let category_list = () => {
    return get(CATEGORY_LIST);
};

 //查看分类详情
export let details_list = ( id ) => {
    return get(DETAILS_LIST.replace("$id$", id), {
        id
    });
};

//查看评价信息
export let evaluation = () => {
    return get(EVALUATION);
};

//承办商列表
export let undertaker = ( key ) => {
    return get( UNDERTAKER,{
        "name": key
    } );
};

//上传七牛
// export async function upload(file,token){
//     let tokenRes = await getUploadToken();
// }
export let getUploadToken = () => {
    return get( UPLOADING );
};  

//数据统计
export let datastatistics = () => {
    return get( DATASTATISTICS );
};  

//查看考生考试记录
export let records = (id) => {
    return get( RECORDS.replace("$id$", id), null, true);
}; 

//已考试，缺考等单场考试列表
export let current = ( id ) => {
    return get(CURRENT.replace("$id$", id), null, true);
}; 

//考试列表
export let examlists = (status) => {
    return get(EXAMLISTS.replace("$status$", status), null, true);
}; 
