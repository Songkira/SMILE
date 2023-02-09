package cp.smile.study_management.board.controller;

import cp.smile.auth.oauth2.CustomOAuth2User;
import cp.smile.config.response.CommonResponse;
import cp.smile.config.response.CustomSuccessStatus;
import cp.smile.config.response.DataResponse;
import cp.smile.config.response.ResponseService;
import cp.smile.config.response.exception.CustomException;
import cp.smile.config.response.exception.CustomExceptionStatus;
import cp.smile.dto.response.PageDTO;
import cp.smile.entity.study_management.StudyBoard;
import cp.smile.entity.user.User;
import cp.smile.entity.user.UserJoinStudy;
import cp.smile.study_management.board.dto.request.StudyBoardWriteDTO;
import cp.smile.study_management.board.dto.response.DetailBoardDTO;
import cp.smile.study_management.board.dto.response.SimpleBoardDTO;
import cp.smile.study_management.board.service.StudyBoardService;
import cp.smile.user.repository.UserJoinStudyRepository;
import cp.smile.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static cp.smile.config.response.CustomSuccessStatus.*;
import static cp.smile.config.response.exception.CustomExceptionStatus.*;

@RestController
@RequestMapping("/studies/{studyId}/boards")
@Slf4j
@RequiredArgsConstructor
public class StudyBoardController {

    private final StudyBoardService studyBoardService;
    private final ResponseService responseService;
    private final UserRepository userRepository;
    private final UserJoinStudyRepository userJoinStudyRepository;

    // TODO : 2023.02.08 - @RequestPart의 파일 부분에 데이터가 들어오지 않는 경우를 처리했는데, 아래 로직에서는 처리가 안되었음.
    @PostMapping
    public CommonResponse write(@AuthenticationPrincipal CustomOAuth2User oAuth2User,
                                @PathVariable int studyId,
                                @RequestPart("data") StudyBoardWriteDTO dto,
                                @RequestPart(value = "files", required = false) List<MultipartFile> files2) {
        log.info("[***file - check***] : {}" , files2);


        MultipartFile[] files = new MultipartFile[files2.size()];
        for(int i = 0; i < files2.size(); i++){
            files[i] = files2.get(i);
        }

        UserJoinStudy userJoinStudy = userJoinStudyRepository.findByUserIdAndStudyId(oAuth2User.getUserId(), studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));


        studyBoardService.write(userJoinStudy, dto, files);
        log.info("스터디 게시글 작성 - 작성자: {} / 스터디: {}",
                userJoinStudy.getUser(), userJoinStudy.getStudyInformation());

        return responseService.getSuccessResponse();
    }

    @GetMapping
    public DataResponse<PageDTO<SimpleBoardDTO>> getAllStudyBoard(
            @AuthenticationPrincipal CustomOAuth2User customOAuth2User,
            @PathVariable int studyId,
            @RequestParam(value = "page", required = false) Integer page,
            @RequestParam(value = "size", required = false) Integer size) {
        // 가입한 스터디의 게시글만 볼 수 있도록 검사
        userJoinStudyRepository.findByUserIdAndStudyId(customOAuth2User.getUserId(), studyId)
                .orElseThrow(() -> new CustomException(USER_NOT_ACCESS_STUDY));

        if (page == null) page = 1;
        if (size == null) size = 10;
        page--;

        if (page < 1 && size < 1) {
            throw new IllegalArgumentException();
        }

        Page<StudyBoard> result = studyBoardService.findByStudyIdWithPaging(studyId, PageRequest.of(page, size));
        List<SimpleBoardDTO> content = result.getContent().stream()
                .map(SimpleBoardDTO::of)
                .collect(Collectors.toList());

        if(content.isEmpty()) return responseService.getDataResponse(PageDTO.of(result, content), RESPONSE_NO_CONTENT);

        return responseService.getDataResponse(PageDTO.of(result, content), RESPONSE_SUCCESS);
    }

    @PostMapping("/{boardId}/comments")
    public CommonResponse writeComment(
            @AuthenticationPrincipal CustomOAuth2User oAuth2User,
            @PathVariable int boardId,
            @RequestBody Map<String, String> body) {
        User writer = userRepository.findById(oAuth2User.getUserId())
                .orElseThrow(() -> new CustomException(ACCOUNT_NOT_FOUND));

        studyBoardService.writeComment(writer, boardId, body.get("content"));

        return responseService.getSuccessResponse();
    }

    @GetMapping("/{boardId}")
    public DataResponse<DetailBoardDTO> getStudyBoardDetail(@PathVariable int boardId) {
        return responseService.getDataResponse(DetailBoardDTO.of(studyBoardService.findByIdForView(boardId)), RESPONSE_NO_CONTENT);
    }
}
