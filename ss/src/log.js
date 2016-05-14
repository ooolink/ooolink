import log4js from 'log4js'
log4js.configure({
    appenders: [
        {type: 'console'},
        {type: 'file', filename: `${__dirname}/../logs/task.log`, category: 'task', maxLogSize: 2048, backups: 100},
        {type: 'file', filename: `${__dirname}/../logs/service.log`, category: 'service', maxLogSize: 2048, backups: 100},
        {type: 'file', filename: `${__dirname}/../logs/model.log`, category: 'model', maxLogSize: 2048, backups: 100},
        {type: 'file', filename: `${__dirname}/../logs/app.log`, category: 'app', maxLogSize: 2048, backups: 100}
    ]
});


//子业务名-子业务方法-事件-文件-标识
global._log = function(cbs, cbsm, event, file, flag){
    return Array.prototype.join.call(arguments, '-');
};
global._taskLog = log4js.getLogger('task');
global._serviceLog = log4js.getLogger('service');
global._modelLog = log4js.getLogger('model');
global._appLog = log4js.getLogger('app');