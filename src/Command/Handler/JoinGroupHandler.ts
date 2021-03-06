import LoggedinHandlerBase from './LoggedinHandlerBase';
import Command from '../Command';
import HandleResult from '../../Message/Handler/HandleResult';
import AgentQq from '../../Model/AgentQq';
import QqGroup from '../../Model/QqGroup';
import BadCommand from '../Error/BadCommand';

class ExitGroupHandler extends LoggedinHandlerBase {
    public Prefix = '算了吧';

    public async processUserCommand(command: Command, user: AgentQq): Promise<HandleResult> {
        const qqGroup = await QqGroup.findQqGroup(user, command.Message.group_id);
        if (!qqGroup) throw new BadCommand('你还没诶嘿呢', command);

        await qqGroup.destroy();
        command.Message.Reply('好吧，再见朋友QAQ');

        return HandleResult.Handled;
    }
}

export default class JoinGroupHandler extends LoggedinHandlerBase {
    public Prefix = [ '诶嘿', '哎嘿', '唉嘿', '欸嘿' ];

    protected acceptFriendMessage = false;

    public async processUserCommand(command: Command, user: AgentQq): Promise<HandleResult> {
        const thisGroup = command.Message.group_id.toString();
        const qqGroup = await QqGroup.findQqGroup(user, command.Message.group_id);
        if (qqGroup) throw new BadCommand(`我认识你，${user.AgentId}！不用重复诶嘿！
退出排行榜请说 ${command.GetAccumulatedPrefix()} ${command.GetCurrentContent(this.Prefix)} 算了吧`, command);

        await QqGroup.addMemberToList(user, command.Message.group_id);
        command.Message.Reply(`好的 ${user.AgentId}，从下周开始排行榜会算上你的。请及时更新数据，否则无法参与当周排名。
后悔的话请说 ${command.GetAccumulatedPrefix()} ${command.GetCurrentContent(this.Prefix)} 算了吧`);
        return HandleResult.Handled;
    }

    constructor() {
        super();

        this
            .RegisterSubHandler(new ExitGroupHandler());
    }
}