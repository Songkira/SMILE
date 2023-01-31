package cp.smile.study_management.board.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class StudyBoardWriteDTO {

    private String title;
    private String content;
    private int typeId;
}
