import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useAllJobsContext } from '../pages/AllJobs';
import { handle } from 'express/lib/router';

const PageButtonContainer = () => {
  const {
    data: { numOfPages, currentPage },
  } = useAllJobsContext();

  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
    console.log(pageNumber);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && 'active'}`}
        key={pageNumber}
        onClick={() => {
          handlePageChange(pageNumber);
        }}
      >
        {pageNumber}
      </button>
    );
  };

  const renderpageButtons = () => {
    const pageButtons = [];

    //first page button
    pageButtons.push(
      addPageButton({ pageNumber: 1, activeClass: currentPage === 1 })
    );

    // dots between page 1 and 3+
    if (currentPage > 3) {
      pageButtons.push(
        <span className='page-btn dots' key='dots-1'>
          ...
        </span>
      );
    }

    // previous page button
    if (currentPage !== 1 && currentPage !== 2) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage - 1,
          activeClass: false,
        })
      );
    }

    // current page button
    if (currentPage !== 1 && currentPage !== numOfPages) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage,
          activeClass: true,
        })
      );
    }

    // next page button
    if (currentPage !== numOfPages && currentPage !== numOfPages - 1) {
      pageButtons.push(
        addPageButton({
          pageNumber: currentPage + 1,
          activeClass: false,
        })
      );
    }

    // dots between last page and two previous pages
    if (currentPage < numOfPages - 2) {
      pageButtons.push(
        <span className='page-btn dots' key='dots+1'>
          ...
        </span>
      );
    }

    // last page button
    pageButtons.push(
      addPageButton({
        pageNumber: numOfPages,
        activeClass: currentPage === numOfPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className='btn prev-btn'
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = 1;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft /> prev
      </button>
      <div className='btn-container'>{renderpageButtons()}</div>
      <button
        className='btn next-btn'
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > numOfPages) nextPage = numOfPages;
          handlePageChange(nextPage);
        }}
      >
        <HiChevronDoubleRight /> next
      </button>
    </Wrapper>
  );
};
export default PageButtonContainer;
